import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/lib/hooks";

export default function InventoryOverview() {
  const products = useAppSelector((state) => state.products.products);

  let totalProducts = 0;
  let totalStoreValue = 0;
  let outOfStocks = 0;
  const categories = new Set<string>();

  products.forEach((product) => {
    if (product.isDisabled) return;
    totalProducts++;
    totalStoreValue += product.price * product.quantity;
    if (product.quantity === 0) {
      outOfStocks++;
    }
    categories.add(product.category);
  });

  return (
    <>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
        Inventory Stats
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
        <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle>Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{totalProducts}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle>Total Store Value</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{totalStoreValue}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle>Out of Stocks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{outOfStocks}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900">
          <CardHeader>
            <CardTitle>No. of Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl">{categories.size}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
