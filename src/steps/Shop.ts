import { Inventory } from "./pages/Inventory";
import { Login } from "./pages/Login";
import { Page } from "@playwright/test";
import { Cart } from "./pages/Cart";

export class Shop {
    public login: Login;
    public inventory: Inventory;
    public cart: Cart;

    public constructor(private page: Page) {
        this.login = new Login(page);
        this.inventory = new Inventory(page);
        this.cart = new Cart(page);
    }
}
