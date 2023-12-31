import { dehydrate } from "@tanstack/react-query";
import getQueryClient from "../../../../../../../../../utils/getQueryClient";
import Hydrate from "../../../../../../../../../utils/hydrate.client";
import { fetchCategoryProducts } from "@/utils/databaseService";
import Productsidecomponent from "@/components/productsidecomponent/Productsidecomponent";

const SubSubCategoryProducts = async ({ params }: any) => {
  const queryClient: any = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: [
      "shop",
      "category",
      params?.slug,
      params?.subCategorySlug,
      params?.subSubCategorySlug,
      params?.subSubSubCategorySlug,
    ],
    queryFn: () =>
      fetchCategoryProducts({
        slug: params?.slug,
        subCatSlug: params?.subCategorySlug,
        subSubCatSlug: params?.subSubCategorySlug,
        subSubSubCatSlug: params?.subSubSubCategorySlug,
      }),
    cacheTime: 60 * 60 * 3,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Productsidecomponent
        params={params}
        queryKey={[
          "shop",
          "category",
          params?.slug,
          params?.subCategorySlug,
          params?.subSubCategorySlug,
          params?.subSubSubCategorySlug,
        ]}
      />
    </Hydrate>
  );
};

export default SubSubCategoryProducts;
