import apiClient from "./apiClient";
import { AxiosError } from "axios";

export const get10BlogsByCreator= async (username: string) => {
    try {
        const response = await apiClient.get(`/blog/creator/${username}`);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
export const getBlogs= async (page: number, pageSize: number, searchTerm: string, categoryId: number | null, adminUserName: string) => {
    try {
        if(categoryId===null) {
            const response = await apiClient.get(`/blog?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&adminUsername=${adminUserName}`);
            return response.data;
        }
        const response = await apiClient.get(`/blog?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&categoryId=${categoryId}&adminUsername=${adminUserName}`);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
export const getAllCategories= async () => {
    try {
        const response = await apiClient.get(`/blog/categories/getAllCategories`);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
export const addBlog= async (title: string, content: string, categoryId: number | null) => {
    try {
        if(categoryId===null) {
            const response = await apiClient.post(`/blog`, {
                title,
                content
            });
            return response.data;
        }
        const response = await apiClient.post(`/blog`, {
            title,
            content,
            categoryId: categoryId? categoryId : null
        });
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
export const getBlogById= async (id: number) => {
    try {
        const response = await apiClient.get(`/blog/${id}`);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
export const addCommentToBlog= async (id: number, content: string) => {
    try {
        const response = await apiClient.post(`/blog/${id}/comment`, {
            content
        });
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}
export const getBlogsOfUser= async (page: number, pageSize: number, searchTerm: string, categoryId: number | null) => {
    try {
        if(categoryId===null) {
            const response = await apiClient.get(`/blog/getUserBlogs?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}`);
            return response.data;
        }
        const response = await apiClient.get(`/blog/getUserBlogs?page=${page}&pageSize=${pageSize}&searchTerm=${searchTerm}&categoryId=${categoryId}`);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }

}
export const deleteBlogById= async (id: number) => {
    try {
        const response = await apiClient.delete(`/blog/${id}`);
        return response.data;
    } catch (error:unknown) {
        if(error instanceof AxiosError) {
            console.error(error);
            if(error?.response?.data?.error) {
                throw new Error(error.response.data.error);
            }
            throw new Error('Something went wrong!');
        }
        console.error(error);
        throw new Error('Invalid username or password');
    }
}