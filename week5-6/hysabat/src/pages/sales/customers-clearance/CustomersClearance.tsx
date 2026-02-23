import { PRODUCT_QUERY } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";

type Item = {
  itemNameEnglish: string;
};

type ItemsQueryResponse = {
  items: {
    nodes: Item[];
  };
};

const Hello = () => {

  const { data, loading, error } = useQuery<ItemsQueryResponse>(PRODUCT_QUERY);

  console.log(data)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {data?.items && data?.items.nodes.length > 0 ? data?.items.nodes.map((item,index)=><p key={index}>{item.itemNameEnglish}</p>) : <p>No data</p>}
    </div>
  )


}

export default Hello