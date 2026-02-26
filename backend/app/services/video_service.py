"""Video generation service using HeyGen API."""
import os
import requests
from fastapi import HTTPException
from config.prompts import PromptConfig

async def generate_video_from_text(script_text: str) -> dict:
    """Generate a video from the provided script text using HeyGen API."""
    heygen_config = PromptConfig.get_heygen_config()
    heygen_api_key = os.getenv("HEYGEN_API_KEY")

    if not heygen_api_key:
        raise HTTPException(status_code=500, detail="HeyGen API key is not configured.")

    headers = {"X-Api-Key": heygen_api_key, "Content-Type": "application/json"}
    data = {
        "video_inputs": [{
            "character": {"type": "avatar", "avatar_id": heygen_config["avatar_id"], "avatar_style": "normal"},
            "input_text": script_text,
            "voice": {"type": "text", "input_text": script_text, "voice_id": heygen_config["voice_id"]}
        }],
        "dimension": heygen_config["dimensions"]
    }

    response = requests.post(heygen_config["api_urls"]["generate"], headers=headers, json=data)
    if response.status_code != 200:
        try:
            error_detail = response.json()
        except Exception:
            error_detail = response.text
        raise HTTPException(status_code=response.status_code, detail=f"HeyGen API error: {error_detail}")

    res_json = response.json()
    video_id = res_json["data"]["video_id"]

    video_url = None
    for _ in range(heygen_config["polling"]["max_attempts"]):
        import time
        time.sleep(heygen_config["polling"]["interval"])
        status_res = requests.get(f"{heygen_config["api_urls"]["status"]}?video_id={video_id}", headers=headers)
        if status_res.status_code != 200:
            continue

        status_json = status_res.json()
        status = status_json.get("data", {}).get("status")
        if status == "completed":
            video_url = status_json["data"].get("video_url")
            break
        elif status == "failed":
            raise HTTPException(status_code=500, detail="HeyGen video generation failed.")

    if not video_url:
        raise HTTPException(status_code=500, detail="Video generation timed out.")

    video_filename = f"video_{video_id}.mp4"
    video_path = os.path.join("uploads", video_filename)

    video_data = requests.get(video_url).content
    with open(video_path, "wb") as f:
        f.write(video_data)

    return {"filename": video_filename, "path": video_path}