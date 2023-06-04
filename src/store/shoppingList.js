import { proxy } from "valtio";
import { devtools } from "valtio/utils";
import { nanoid } from "nanoid";
import productsStore from "./products";

export const addShoppingItem = (productId, quantity, notes) => {
  const currentShopItemListProductIds = Object(
    shoppingListStore.shoppingListById
  )
    .value()
    .map((shopListItem) => shopListItem.productId);
  if (!currentShopItemListProductIds.includes(productId)) {
    throw new Error("Shop item added already exist");
  }
  try {
    const productData = productsStore.productsById[productId];
    const productPrice = productData.price;

    const newShopListItem = {
      itemId: nanoid(),
      productId,
      productPrice,
      notes,
      quantity,
      isShopped: false
    };

    shoppingListStore.shoppingListIds = [
      newShopListItem.itemId,
      ...shoppingListStore.shoppingListIds
    ];
    shoppingListStore.shoppingListById[
      newShopListItem.itemId
    ] = newShopListItem;
  } catch (error) {
    shoppingListStore.error = error;
  }
};

const shoppingListStore = proxy({
  shoppingListIds: [],
  shoppingListById: {},
  recentlyAddedShopItem: {},
  computeShoppedListItemPrice: (itemId) => {
    let totalShoppedListItemPrice = 0;
    const isShopped = shoppingListStore.shoppingListById[itemId].isShopped;
    if (isShopped) {
      const quantity = Number(
        shoppingListStore.shoppingListById[itemId].quantity
      );
      const price = Number(shoppingListStore.shoppingListById[itemId].price);
      totalShoppedListItemPrice = price * quantity;
    }

    return totalShoppedListItemPrice;
  },
  totalShoppingItemsCount: (get) =>
    get(shoppingListStore).shoppingListIds.reduce(
      (shoppingItemListCount, shopListItemId) => {
        const shopListItemData =
          shoppingListStore.shoppingListById[shopListItemId];
        const shopItemQuantity = shopListItemData.shopItemQuantity;
        shoppingItemListCount += shopItemQuantity;
        return shoppingItemListCount;
      },
      0
    ),
  totalShoppedItemsCount: (get) =>
    get(shoppingListStore).shoppingListIds.reduce(
      (shoppedItemCount, shopListItemId) => {
        const shopListItemData =
          shoppingListStore.shoppingListById[shopListItemId];
        const isShoppedItem = shopListItemData.isShopped;
        if (isShoppedItem) {
          shoppedItemCount += 1;
        }
        return shoppedItemCount;
      },
      0
    ),
  isAdding: false
});

devtools(shoppingListStore, { name: "shopping list store" });

export default shoppingListStore;
