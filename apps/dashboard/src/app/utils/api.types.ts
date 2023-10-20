export interface ImageGroup {
  id: string;
  name: string;
  variants: string[];
}

export interface ImageGroupVariant {
  name: string;
  width: number;
  height: number;
  fit: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
}

export type ApiResponse<T = void> =
  | {
      success: true;
      result: T;
    }
  | {
      success: false;
      error: string;
    };

export type ListImageGroupsResponse = ApiResponse<{
  groups: ImageGroup[];
}>;

export type GetImageGroupResponse = ApiResponse<{
  group: ImageGroup;
}>;

export type AddImageGroupResponse = GetImageGroupResponse;

export type DeleteImageGroupResposne = ApiResponse;

export type ListImageGroupVariantsResponse = ApiResponse<{
  variants: ImageGroupVariant[];
}>;

export type GetImageGroupVariantResponse = ApiResponse<{
  variant: ImageGroupVariant;
}>;

export type AddImageGroupVariantResponse = GetImageGroupVariantResponse;

export type DeleteImageGroupVariantResponse = ApiResponse;
