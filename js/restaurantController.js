import { Category, Allergen, Menu, Coordinate, Dish, Restaurant, } from './restaurant.js';
import { getCookie } from "./util.js";

const MODEL = Symbol('restaurant');
const VIEW = Symbol('restaurantView');
const AUTH = Symbol('AUTH');
const USER = Symbol('USER');
const LANGUAGE = Symbol('LANGUAGE');
const LOAD_RESTAURANT = Symbol('Load Manager Objects');

class RestaurantController {
    constructor(model, view, auth) {

        this[MODEL] = model;
        this[VIEW] = view;
        this[AUTH] = auth;
        this[USER] = null;
        this[LANGUAGE] = 'es';

        this.onLoad();

        this.onInit();
        this[VIEW].bindInit(this.handleInit);


    }

    [LOAD_RESTAURANT]() {
        // Crear instancias de las categorías, platos, alérgenos, menús y restaurantes

        // Creamos los 4 platos de Hamburguesas
        let italiana = new Dish("Italiana", "Hamburguesa italiana",
            ["italiana", "Tomate"],
            "URL_italiana_Con_Tomate");

        let smash = new Dish("Smash", "Hamburguesa smash",
            ["smash", "Tomate"],
            "URL_smash_Con_Tomate");

        let vegetariana = new Dish("Vegetariana", "Hamburguesa vegetal",
            ["vegetal", "Tomate"],
            "URL_vegetal_Con_Tomate");

        let barbacoa = new Dish("Barbacoa", "Hamburguesa barbacoa",
            ["barbacoa", "Tomate"],
            "URL_barbacoa_Con_Tomate");


        // Creamos los 4 platos de heladoss
        let chocolate = new Dish("Chocolate", "Helado de chocolate",
            ["chocolate", "Salsa"],
            "URL_chocolate_En_Salsa");

        let vainilla = new Dish("Vainilla", "Helado de vainilla",
            ["vainilla", "Salsa"],
            "URL_vainilla_En_Salsa");

        let nata = new Dish("Nata", "Helado de nata",
            ["nata", "Salsa"],
            "URL_nata_En_Salsa");

        let pistacho = new Dish("Pistacho", "Helado de pistacho",
            ["pistacho", "Salsa"],
            "URL_pistacho_En_Salsa");


        // Creamos los 4 platos de brochetas
        let pollo = new Dish("Pollo", "Brocheta de pollo",
            ["pollo", "Salsa"],
            "URL_pollo_En_Salsa");

        let ternera = new Dish("Ternera", "Brocheta de ternera",
            ["ternera", "Salsa"],
            "URL_ternera_En_Salsa");

        let vegetal = new Dish("Vegetal", "Brocheta vegetal",
            ["vegetal", "Salsa"],
            "URL_vegetal_En_Salsa");

        let mixto = new Dish("Mixto", "Brocheta mixta",
            ["mixto", "Salsa"],
            "URL_mixto_En_Salsa");


        this[MODEL].addDish(italiana, smash, vegetariana, barbacoa, pollo, mixto, vegetal, ternera, chocolate, vainilla, pistacho, nata);

        // Crear un objeto de la clase Category
        let brochetas = new Category("Brochetas", "Pimiento, cebolla y carne...");
        let hamburguesas = new Category("Hamburguesas", "Jugosas y al punto");
        let helados = new Category("Helados", "Helados Naturales");

        this[MODEL].addCategory(hamburguesas, brochetas, helados);

        // Crear un objeto de la clase Allergen
        let gluten = new Allergen("Gluten", "Las hamburguesas contiene gluten");
        let lactosa = new Allergen("Lactosa", "La salsa contiene leche");
        let frutosSecos = new Allergen("Frutos Secos", "La brochetas contiene trazas de frutos secos");
        let platano = new Allergen("Platanos", "La salsa puede contener trazas de platano");

        // Crear un objeto de la clase Menu
        let menuHamburguesas = new Menu("Menu Hamburguesas", "Menu diario del restaurante");
        let menuBrochetas = new Menu("Menu Brochetas", "Menu diario del restaurante");
        let menuHelados = new Menu("Menu Helados", "Menu diario del restaurante");

        // Crear un objeto de la clase Coordinate
        let coordenadasSergio = new Coordinate(40.7128, -74.0060);
        let coordenadasGourmet = new Coordinate(40.7128, -74.0060);
        let coordenadasTenedor = new Coordinate(40.7128, -74.0060);

        // Crear un objeto de la clase Restaurant
        let cocinaDeSergio = new Restaurant("La cocina de Sergio", "Restaurante tradicional", coordenadasSergio);
        let cocinaGourmet = new Restaurant("La cocina Gourmet", "Restaurante de calidad mundial", coordenadasGourmet);
        let cocinaTenedor = new Restaurant("La cocina del Tenedor", "Restaurante de estrella michelin", coordenadasTenedor);

        this[MODEL].addRestaurant(cocinaDeSergio, cocinaGourmet, cocinaTenedor);

        // Asignamos los platos a las categorías
        this[MODEL].assignCategoryToDish(hamburguesas, italiana, smash, vegetariana, barbacoa);

        this[MODEL].assignCategoryToDish(brochetas, pollo, mixto, vegetal, ternera);

        this[MODEL].assignCategoryToDish(helados, chocolate, vainilla, pistacho, nata);

        //Asignamos los platos a los alergenos
        this[MODEL].assignAllergenToDish(gluten, italiana, smash, vegetariana, barbacoa, vegetal, ternera);
        this[MODEL].assignAllergenToDish(lactosa, chocolate, vainilla, pistacho, nata);
        this[MODEL].assignAllergenToDish(frutosSecos, chocolate, pistacho);
        this[MODEL].assignAllergenToDish(platano, vainilla, nata)

        // Asignamos los platos a los menus 
        this[MODEL].assignMenuToDish(menuHamburguesas, barbacoa, vegetariana, smash);
        this[MODEL].assignMenuToDish(menuHelados, nata, vainilla, chocolate);
        this[MODEL].assignMenuToDish(menuBrochetas, ternera, vegetal, pollo);

    }

    onLoad = () => {
        if (getCookie('accetedCookieMessage') !== 'true') {
            this[VIEW].showCookiesMessage();
        }

        if (getCookie('activeUser')) {
        } else {
            this[VIEW].showIdentificationLink();
            this[VIEW].bindIdentificationLink(this.handleLoginForm);
        }

        const userCookie = getCookie('activeUser');
        if (userCookie) {
            const user = this[AUTH].getUser(userCookie);
            // Asigna el usuario y abre una sesión con ese usuario
            if (user) {
                this[USER] = user;
                this.onOpenSession();
            }
        } else {
            this.onCloseSession();
        }

        this[LOAD_RESTAURANT]();
        this.onAddCategory();
        this.onAddAllergens();
        this.onAddMenus();
        this.onAddRestaurant();

        // Manejador para cambiador de idioma
        this[VIEW].bindLanguageSelection(this.handleChangeLanguage);

        // Recoge el idioma
        const language = this[VIEW].getLanguage();
        if (language) {
            this[LANGUAGE] = language;
            this.onChangeLanguage();
        }

    };

    onInit = () => {
        this[VIEW].showCategories(this[MODEL].getCategories());
        this[VIEW].showDishes(this[MODEL].getCategories());
        // Categorias
        this[VIEW].bindDishesCategoryList(this.handleDishesCategoryList,);
        this[VIEW].bindDishesCategoryListInMenu(this.handleDishesCategoryList,);

        // Alergenos
        this[VIEW].bindDishesAllergenListInMenu(this.handleDishesAllergenList,);

        // Menus
        this[VIEW].bindDishesMenuListInMenu(this.handleDishesMenuList,);

        // Restaurant
        this[VIEW].bindRestaurantListInMenu(this.handleRestaurantList,);
    }

    handleInit = () => {
        this.onInit();
    }

    onAddCategory = () => {
        this[VIEW].showCategoriesInMenu(this[MODEL].getCategories());
    };

    onAddAllergens = () => {
        this[VIEW].showAllergensInMenu(this[MODEL].getAllergens());
    };

    onAddMenus = () => {
        this[VIEW].showMenusInMenu(this[MODEL].getMenus());
    };

    onAddRestaurant = () => {
        this[VIEW].showRestaurantsInMenu(this[MODEL].getRestaurants());
    };


    // Manejador que recibe el idioma, lo asigna en el controlador para poder reucperarlo cuando lo necesitemos
    // y lanza los cambios necesarios
    handleChangeLanguage = (language) => {
        this[LANGUAGE] = language;
        this.onChangeLanguage();
    };

    // Cambia la bandera del idioma pasando como dato el lenguaje que tenemos registrado
    onChangeLanguage() {
        this[VIEW].showSelectedLanguage(this[LANGUAGE]);
    }


    onOpenSession() {
        this.onInit();
        // ShoppingCartApp.onInit();
        this[VIEW].initHistory();
        this[VIEW].showAuthUserProfile(this[USER]);
        this[VIEW].bindCloseSession(this.handleCloseSession);
        this[VIEW].showAdminMenu();
        this[VIEW].bindAdminMenu(
            this.handleNewCategoryForm,
            this.handleRemoveCategoryForm,
            this.handleNewProductForm,
            this.handleRemoveProductForm,
            this.handleNewRestaurantForm,
            this.handleNewAsMenuForm);
    }

    // Manejador para cerrar la sesión
    handleCloseSession = () => {
        // Realiza determinadas acciones
        this.onCloseSession();
        this.onInit();
        this[VIEW].initHistory();
    };

    onCloseSession() {
        // Desasigna el usuario
        this[USER] = null;
        // Borra la cookie
        this[VIEW].deleteUserCookie();
        this[VIEW].showIdentificationLink();
        this[VIEW].bindIdentificationLink(this.handleLoginForm);
        // Borra el menú de administración
        this[VIEW].removeAdminMenu();
    }

    handleLoginForm = () => {
        this[VIEW].showLogin();
        this[VIEW].bindLogin(this.handleLogin);
    };

    // El argumento remember es para mantener la sesión si el usuario ha clickeado "Recuérdame"
    handleLogin = (username, password, remember) => {
        // Lo valida, y si es correcto, tendremos un objeto usuario
        if (this[AUTH].validateUser(username, password)) {
            // Lo guardamos para poder reutilizarlo cuando queramos
            this[USER] = this[AUTH].getUser(username);
            this.onOpenSession();

            if (remember) {
                this[VIEW].setUserCookie(this[USER]);
            }
            // SI no existe, mostramos un mensaje de que el usuario es incorrecto
        } else {
            this[VIEW].showInvalidUserMessage();
        }
    };


    handleDishesCategoryList = (title) => {
        const category = (this[MODEL].getCategory(title));
        this[VIEW].listCategories(this[MODEL].getCategoryProducts(category),
            category.name);
        this[VIEW].bindShowDetailsDishes(this.handleShowDetailsDishes);
    };

    handleDishesAllergenList = (title) => {
        const allergen = (this[MODEL].getAllergen(title));
        this[VIEW].listAllergens(this[MODEL].getAllergenProducts(allergen),
            allergen.name);
        this[VIEW].bindShowDetailsDishes(this.handleShowDetailsDishes);
    };

    handleDishesMenuList = (title) => {
        const menu = (this[MODEL].getMenu(title));
        this[VIEW].listMenus(this[MODEL].getMenuProducts(menu),
            menu.name);
        this[VIEW].bindShowDetailsDishes(this.handleShowDetailsDishes);
    };

    handleRestaurantList = (title) => {
        const restaurant = (this[MODEL].getRestaurant(title));
        this[VIEW].listRestaurant(this[MODEL].getRestaurantsDetails(restaurant),
            restaurant.name);
    };

    handleShowDetailsDishes = (name) => {
        try {
            let dish = this[MODEL].getDish(name);

            this[VIEW].showDetailsDishes(dish);

            this[VIEW].bindShowProductInNewWindow(
                this.handleShowProductInNewWindow,
            );

        } catch (error) {
            this[VIEW].showDetailsDishes(null, 'No existe este producto en la página.');
        }
    };

    handleShowProductInNewWindow = (name) => {

        let dish = this[MODEL].getDish(name);


        this[VIEW].showProductInNewWindow(dish);


    };

    handleNewCategoryForm = () => {
        this[VIEW].showNewCategoryForm();
        this[VIEW].bindNewCategoryForm(this.handleCreateCategory);

    };

    handleCreateCategory = (title, url, desc) => {
        const cat = this[MODEL].getCategorie(title);
        cat.description = desc;
        let done;
        let error;
        try {
            this[MODEL].addCategory(cat);
            this.onAddCategory();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this[VIEW].showNewCategoryModal(done, cat, error);
    };


    handleRemoveCategoryForm = () => {
        this[VIEW].showRemoveCategoryForm(this[MODEL].getCategories());
        this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
    };

    handleRemoveCategory = (title) => {
        let done;
        let error;
        let cat;
        try {
            cat = this[MODEL].getCategory(title);
            this[MODEL].removeCategory(cat);
            done = true;
            this.onAddCategory();
            this.handleRemoveCategoryForm();
        } catch (exception) {
            done = false;
            error = exception;
        }
        this[VIEW].showRemoveCategoryModal(done, cat, error);
    };

    handleNewProductForm = () => {
        this[VIEW].showNewProductForm(this[MODEL].getCategories(), this[MODEL].getAllergens());
        this[VIEW].bindNewProductForm(this.handleCreateProduct);
    };


    handleCreateProduct = (name, description, ingredients, image, categories, allergens) => {
        let done;
        let error;
        let dish;

        try {
            dish = this[MODEL].getDishNT(name);
            dish.description = description;
            dish.ingredients = ingredients;
            dish.image = image;
            this[MODEL].addDish(dish);
            categories.forEach((title) => {
                const category = this[MODEL].getCategory(title);
                this[MODEL].assignCategoryToDish(category.category, dish);
            });
            allergens.forEach((title) => {
                const allergen = this[MODEL].getAllergen(title);
                this[MODEL].assignAllergenToDish(allergen.allergen, dish);
            });
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this[VIEW].showNewProductModal(done, dish, error);
    };

    handleRemoveProductListByCategory = (title) => {
        console.log(title)
        const cat = this[MODEL].getCategory(title);
        console.log(cat)
        this[VIEW].showRemoveProductList(this[MODEL].getCategoryProducts(cat));
        this[VIEW].bindRemoveProduct(this.handleRemoveProduct);
    };

    handleRemoveProductForm = () => {
        this[VIEW].showRemoveProductForm(this[MODEL].getCategories());
        this[VIEW].bindRemoveProductSelects(this.handleRemoveProductListByCategory);
    };


    handleRemoveProduct = (serial) => {
        let done;
        let error;
        let product;
        try {
            console.log(serial)
            product = this[MODEL].getDish(serial);
            console.log(product)
            this[MODEL].removeDish(product);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this[VIEW].showRemoveProductModal(done, product, error);
    };


    // Invocación de los metodos de vista de nuevos restaurantes
    handleNewRestaurantForm = () => {
        this[VIEW].showNewRestaurantForm(this[MODEL].categories);
        this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
    };

    // Handle de creacion del restaurante en el modelo
    handleCreateRestaurant = (name, location, description) => {
        let done;
        let error;
        let restaurant;

        try {
            restaurant = this[MODEL].getRestaurantCr(name);
            restaurant.location = location;
            restaurant.description = description;
            this[MODEL].addRestaurant(restaurant);
            this.onAddRestaurant();
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }

        this[VIEW].showNewRestaurantModal(done, restaurant, error);
    };


    handleNewAsMenuForm = () => {
        this[VIEW].showAsMenuForm(this[MODEL].getDishes(), this[MODEL].getMenus());
        this[VIEW].bindNewAsDsMenuForm(this.handleAsignMenu);
    };

    handleAsignMenu = (dish, menu) => {
        let done;
        let error;

        try {
            product = this[MODEL].assignMenuToDish(menu, dish);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
            throw new Error(exception);
        }

        this[VIEW].showNewProductModal(done, dish, menu, error);
    };

}


export default RestaurantController;