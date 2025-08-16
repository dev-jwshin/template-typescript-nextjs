import {
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

import { apiUtils } from "@/lib/api";
import type { QueryError } from "@/types/query";
import type { User } from "@/types/user/user";
import { useCrudUserApi } from "./use-crud-user-api";

/**
 * User API 훅 (확장 가능)
 *
 * 이 파일은 자동 생성되지 않습니다. 커스텀 메서드를 여기에 추가하세요.
 * CRUD 기능 + 커스텀 확장 기능 포함
 */
export function useUserApi() {
  const queryClient = useQueryClient();
  const crudApi = useCrudUserApi();

  return {
    // CRUD 기능들을 전개
    ...crudApi,

    /**
     * 현재 사용자 정보 조회
     */
    me: (
      options?: Omit<UseQueryOptions<User, QueryError>, "queryKey" | "queryFn">
    ) => {
      return useQuery({
        queryKey: ["users", "me"],
        queryFn: async (): Promise<User> => {
          return apiUtils.get<User>("users/me");
        },
        staleTime: 5 * 60 * 1000,
        ...options,
      });
    },
  };
}

// 편의를 위한 개별 export
export { useCrudUserApi };
