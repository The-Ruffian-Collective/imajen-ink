export interface ReplicateResponse {
    id: string;
    status: string;
    output: string[];
    error?: string;
}

export interface ReplicateStatus {
    id: string;
    status: 'starting' | 'processing' | 'succeeded' | 'failed';
} 