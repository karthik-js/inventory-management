import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setProductToEdit,
  updateProduct,
} from "@/lib/stores/features/products/productsSlice";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define your Zod schema
const productSchema = z.object({
  category: z.string().min(1, "Category is required"),
  price: z.number().nonnegative("Price must be a positive number"),
  quantity: z.number().nonnegative("Quantity must be a positive number"),
  value: z.number().nonnegative("Value must be a positive number"),
});

type ProductToUpdate = z.infer<typeof productSchema>;

export default function UpdateProductDialog() {
  const appDispatch = useAppDispatch();
  const productToUpdate = useAppSelector(
    (state) => state.products.productToEdit
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductToUpdate>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      quantity: 0,
      category: "",
      value: 0,
    },
  });

  useEffect(() => {
    if (productToUpdate != null) {
      setValue("price", productToUpdate.price);
      setValue("quantity", productToUpdate.quantity);
      setValue("category", productToUpdate.category);
      setValue("value", productToUpdate.value);
    }
  }, [productToUpdate, setValue]);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      appDispatch(setProductToEdit(null));
    }
  };

  const onSubmit = (data: ProductToUpdate) => {
    appDispatch(
      updateProduct({
        ...productToUpdate!,
        ...data,
      })
    );

    appDispatch(setProductToEdit(null));
  };

  const onDetailChange =
    (name: keyof ProductToUpdate) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      let parsedValue;

      if (name === "category") {
        parsedValue = value;
      }

      if (value) {
        parsedValue = parseFloat(value);
      } else {
        parsedValue = 0;
      }

      // Use setValue to handle the updated value
      setValue(name, parsedValue);
    };

  return (
    <Dialog open={productToUpdate != null} onOpenChange={onOpenChange} modal>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>{productToUpdate?.name}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="category"
                    type="text"
                    className={errors.category ? "border-red-500" : ""}
                    value={field.value}
                    onChange={onDetailChange("category")}
                  />
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="price">Price</Label>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="price"
                    type="text"
                    value={field.value}
                    className={errors.price ? "border-red-500" : ""}
                    onChange={onDetailChange("price")}
                  />
                )}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            <div className="grid items-center gap-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Controller
                name="quantity"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="quantity"
                    type="text"
                    value={field.value}
                    className={errors.quantity ? "border-red-500" : ""}
                    onChange={onDetailChange("quantity")}
                  />
                )}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            <div className="grid items-center gap-4">
              <Label htmlFor="value">Value</Label>
              <Controller
                name="value"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="value"
                    type="text"
                    value={field.value}
                    className={errors.value ? "border-red-500" : ""}
                    onChange={onDetailChange("value")}
                  />
                )}
              />
              {errors.value && (
                <p className="text-red-500 text-sm">{errors.value.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
