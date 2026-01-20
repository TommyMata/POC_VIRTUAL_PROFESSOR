import axiosInstance from '@lib/axios'
import type { AxiosRequestConfig } from 'axios'
import type { ApiResponse } from '@/types/api.types'

class ApiService {
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.get<T>(url, config)
      return {
        data: response.data,
        status: response.status,
        success: true,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.post<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.put<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.patch<T>(url, data, config)
      return {
        data: response.data,
        status: response.status,
        success: true,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await axiosInstance.delete<T>(url, config)
      return {
        data: response.data,
        status: response.status,
        success: true,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: unknown): Error {
    if (error instanceof Error) {
      return error
    }
    return new Error('An unknown error occurred')
  }
}

export const apiService = new ApiService()
