interface VndbResponse {
  results: [];
  more: boolean;
  count?: number;
  compact_filters?: string;
  normalized_filters?: [];
}

export type { VndbResponse };