
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
} from './exceptions.js';

// Objeto para identifica los datos de un plato
class Dish {

    #name;
    #description;
    #ingredients;
    #image;

    constructor(name, description = "", ingredients = [], image = "") {
        this.#name = name;
        this.#description = description;
        this.#ingredients = ingredients;
        this.#image = image;


        // Get y set de name
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });


        // Get y set de description
        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });


        // Get y set de ingredients
        Object.defineProperty(this, 'ingredients', {
            enumerable: true,
            get() {
                return this.#ingredients;
            },
            set(value) {
                this.#ingredients = value;
            },
        });


        // Get y set de image
        Object.defineProperty(this, 'image', {
            enumerable: true,
            get() {
                return this.#image;
            },
            set(value) {
                this.#image = value;
            },
        });
    }

    toString() {
        return "Name: " + this.#name + "\n" + "Description: " + this.#description + "\n" +
            "Ingredients: " + this.#ingredients + "\n" + "Image: " + this.#image;
    }
}


// Con este objeto podemos crear la estructura de categorías
class Category {
    #name;
    #description;

    constructor(name, description = " ") {

        this.#name = name;
        this.#description = description;

        // Get y set de name
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });


        // Get y set de description
        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                this.#description = value;
            },
        });
    }

    toString() {
        return "Name: " + this.#name + "\n" + "Description: " + this.#description;
    }
}


// Representa los alérgenos que pueden tener un determinado plato
class Allergen {
    #name;
    #description;

    constructor(name, description = " ") {

        this.#name = name;
        this.#description = description;


        // Get y set de name
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });


        // Get y set de description
        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });
    }

    toString() {
        return "Name: " + this.#name + "\n" + "Description: " + this.#description;
    }
}


// Se trata de una agregación de platos
class Menu {
    #name;
    #description;

    constructor(name, description = " ") {

        this.#name = name;
        this.#description = description;


        // Get y set de name
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });


        // Get y set de description
        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });
    }


    toString() {
        return "Name: " + this.#name + "\n" + "Description: " + this.#description;
    }
}


// Representa un recurso restaurante para formar parte de la cadena de restaurantes a gestionar 
class Restaurant {

    #name;
    #description;
    #location;

    constructor(name, description = "", location = "") {
        this.#name = name;
        this.#description = description;
        this.#location = location


        // Get y set de name
        Object.defineProperty(this, 'name', {
            enumerable: true,
            get() {
                return this.#name;
            },
            set(value) {
                if (!value) throw new EmptyValueException('name');
                this.#name = value;
            },
        });


        // Get y set de description
        Object.defineProperty(this, 'description', {
            enumerable: true,
            get() {
                return this.#description;
            },
            set(value) {
                // if (!value) throw new EmptyValueException('description');
                this.#description = value;
            },
        });


        // Get y set de location
        Object.defineProperty(this, 'location', {
            enumerable: true,
            get() {
                return this.#location;
            },
            set(value) {
                // if (!value) throw new EmptyValueException('location');
                this.#location = value;
            },
        });
    }


    toString() {
        return "Name: " + this.#name + "\n" + "Description: " + this.#description + "\n" + "Location: " + this.#location;
    }
}


// Son coordenadas para localizar una ubicación.
class Coordinate {

    #latitude;
    #longitude;

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;


        // Get y set de latitude
        Object.defineProperty(this, 'latitude', {
            enumerable: true,
            get() {
                return this.#latitude;
            },
            set(value) {
                if (!value) throw new EmptyValueException('latitude');
                this.#latitude = value;
            },
        });


        // Get y set de longitude
        Object.defineProperty(this, 'longitude', {
            enumerable: true,
            get() {
                return this.#longitude;
            },
            set(value) {
                if (!value) throw new EmptyValueException('longitude');
                this.#longitude = value;
            },
        });
    }


    toString() {
        return "Latitud: " + this.#latitude + "\n" + "Longitud: " + this.#longitude;
    }
}


// Objeto RestaurantsManager (Singleton)
let RestaurantsManager = (function () {
    let instantiated;

    class RestaurantsManager {

        #systemName = "Nombre del Sistema";
        #categories = [];
        #allergens = [];
        #dishes = [];
        #menus = [];
        #restaurants = [];


        #getDishPosition(dish) {
            return this.#dishes.findIndex((elemento) => elemento.name === dish.name);
        }


        #getCategoryPosition(category) {
            return this.#categories.findIndex((elemento) => elemento.category === category.category);
        }


        #getAllergenPosition(allergen) {
            return this.#allergens.findIndex((elemento) => elemento.allergen === allergen.allergen);
        }


        #getMenuPosition(menu) {
            return this.#menus.findIndex((elemento) => elemento.menu === menu.menu);
        }

        getCategoryProducts(category, ordered) {
            if (!(category.category instanceof Category)) {
                throw new ObjecManagerException('category', 'Category');
            }

            if (this.#categories.includes(category)) {
                const storedCategory = this.#categories.find(ct => ct.category === category.category);
                const values = (ordered)
                    ? storedCategory.dishes(ordered)
                    : storedCategory.dishes;
                return {
                    *[Symbol.iterator]() {
                        for (const product of values) {
                            yield product;
                        }
                    },
                };

            }
        }



        getAllergenProducts(allergen, ordered) {
            if (!(allergen.allergen instanceof Allergen)) {
                throw new ObjecManagerException('allergen', 'allergen');
            }

            if (this.#allergens.includes(allergen)) {
                const storedAllergen = this.#allergens.find(ct => ct.allergen === allergen.allergen);
                const values = (ordered)
                    ? storedAllergen.dishes(ordered)
                    : storedAllergen.dishes;
                return {
                    *[Symbol.iterator]() {
                        for (const product of values) {
                            yield product;
                        }
                    },
                };

            }

        }

        getMenuProducts(menu, ordered) {
            if (!(menu.menu instanceof Menu)) {
                throw new ObjecManagerException('menu', 'menu');
            }

            if (this.#menus.includes(menu)) {
                const storedMenu = this.#menus.find(ct => ct.menu === menu.menu);
                const values = (ordered)
                    ? storedMenu.dishes(ordered)
                    : storedMenu.dishes;
                return {
                    *[Symbol.iterator]() {
                        for (const product of values) {
                            yield product;
                        }
                    },
                };

            }

        }

        getRestaurantsDetails(restaurant, ordered) {
            if (!(restaurant instanceof Restaurant)) {
                throw new ObjecManagerException('menu', 'Menu');
            }

            let restaurants = this.#restaurants;

            for (const res of restaurants) {
                if (res.name.includes(restaurant.name)) {
                    const storedRes = res;
                    return storedRes
                }
            }

        }

        getRestaurant(title) {

            let restaurants = this.#restaurants;

            for (const res of restaurants) {
                if (res instanceof Restaurant) {
                    var resDet = this.#restaurants.find(ct => ct.name === title);
                }
            }

            if (resDet) {
                return resDet;
            } else {
                throw new Error("No se encontro el restaurante " + title);
            }

        }

        getRestaurantCr(title = 'Anon') {
            let rest = this.#restaurants.includes(title);

            if (!rest) {
                rest = new Restaurant(title);
            } else {
                rest = rest;
            }
            return rest;
        }

        getCategorie(title = 'Anon') {
            let cat = this.#categories.includes(title);

            if (!cat) {
                cat = new Category(title);
            } else {
                cat = cat.category;
            }
            return cat;
        }

        getCategory(title) {

            let categorias = this.#categories;

            for (const cate of categorias) {
                if (cate.category instanceof Category) {
                    var cat = this.#categories.find(ct => ct.category.name === title);
                }
            }

            if (cat) {
                return cat;
            } else {
                throw new Error("No se encontro la categoria " + title);
            }

        }

        getAllergen(title) {

            let allergens = this.#allergens;

            for (const alle of allergens) {
                if (alle.allergen instanceof Allergen) {
                    var aller = this.#allergens.find(ct => ct.allergen.name === title);
                }
            }

            if (aller) {
                return aller;
            } else {
                throw new Error("No se encontro el Alergeno " + title);
            }

        }

        getMenu(title) {
            let menus = this.#menus;

            for (const menu of menus) {
                if (menu.menu instanceof Menu) {
                    var men = this.#menus.find(ct => ct.menu.name === title);
                }
            }

            if (men) {
                return men;
            } else {
                throw new Error("No se encontro el Menu " + title);
            }

        }


        // Getter para obtener un iterador de menús
        getMenus() {
            const menuIterator = this.#menus;
            return {
                *[Symbol.iterator]() {
                    for (const menu of menuIterator) {
                        if (menu.menu instanceof Menu) {
                            yield menu;
                            console.log(menu)
                        }
                    }
                },
            };
        }

        // Getter para obtener un iterador de restaurantes
        getRestaurants() {
            const restaurantIterator = this.#restaurants;
            return {
                *[Symbol.iterator]() {
                    for (const restaurant of restaurantIterator) {
                        if (restaurant instanceof Restaurant) {
                            yield restaurant;
                        }

                    }
                },
            };
        }

        // Getter para obtener un iterador de categorías
        getCategories() {
            const categories = this.#categories;
            return {
                *[Symbol.iterator]() {
                    for (const category of categories) {
                        if (category.category instanceof Category) {
                            yield category;
                        }
                    }
                },
            };
        }

        // Getter para obtener un iterador de alérgenos
        getAllergens() {
            const allergenIterator = this.#allergens;
            return {
                *[Symbol.iterator]() {
                    for (const allergen of allergenIterator) {
                        if (allergen.allergen instanceof Allergen) {
                            yield allergen;
                        }
                    }
                },
            };
        }


        // Getter para obtener un iterador de dishes
        getDishes() {
            const dishIterator = this.#dishes;
            return {
                *[Symbol.iterator]() {
                    for (const dish of dishIterator) {
                        if (dish instanceof Dish) {
                            yield dish;
                        }
                    }
                },
            };
        }

        getDish(name) {
            let dishes = this.#dishes;
            for (const di of dishes) {
                if (di instanceof Dish) {
                    const dish = dishes.find(obj => obj.name === name);
                    if (dish) {
                        return dish;
                    }
                }
            }
            return null; // Si no se encuentra el objeto, devolvemos null
        }

        getDishNT(title = 'Anon') {
            let dish = this.#dishes.includes(title);

            if (!dish) {
                dish = new Dish(title);
            } else {
                dish = dish.dish;
            }
            return dish;
        }

        // Método para añadir una nueva categoría
        addCategory(...categories) {
            for (const cat of categories) {
                if (!(cat instanceof Category)) {
                    throw new CategoryException();
                }
                if (cat === null) {
                    throw new EmptyValueException();
                }
                let obj = { category: cat, dishes: [] };

                if (this.#getCategoryPosition(obj) !== -1) {
                    throw new CategoryInTheListException();
                } else {
                    this.#categories.push(obj);
                }
            }
        }


        // Método para eliminar una categoría
        removeCategory(...categoriesToRemove) {
            for (const category of categoriesToRemove) {

                // Sacamos la posición
                let position = this.#categories.findIndex((elemento) => elemento.category === category.category);

                // Verificar si la categoría ya existe
                if (position === -1) {
                    throw new Error("La categoría ya existe.");
                }


                // Eliminar la categoría del sistema
                this.#categories.splice(position, 1);

            }
        }


        // Método para añadir un menú
        addMenu(...menuToAdd) {
            for (const menu of menuToAdd) {
                if (!(menu instanceof Menu)) {
                    throw new MenuException();
                }
                if (menu === null) {
                    throw new EmptyValueException();
                }
                let obj = { menu: menu, dishes: [] };

                if (this.#getMenuPosition(obj) !== -1) {
                    throw new CategoryInTheListException();
                } else {
                    this.#menus.push(obj);
                }
            }
        }


        // Método para eliminar un menú
        // Método para eliminar un menú
        removeMenu(...menuToRemove) {
            for (const menu of menuToRemove) {
                // Sacamos la posición
                let position = this.#menus.findIndex((elemento) => elemento.name === menu.name)
                // Verificar si el menú esta registrado
                if (position === -1) {
                    throw new Error("El menú no existe.");
                }

                // Eliminar el menú del sistema
                this.#menus.splice(position, 1);
            }
        }


        // Método para añadir un alérgeno
        addAllergen(...allergenToAdd) {
            for (const all of allergenToAdd) {
                if (!(all instanceof Allergen)) {
                    throw new AllergnException();
                }
                if (all === null) {
                    throw new EmptyValueException();
                }
                let obj = { allergen: all, dishes: [] };

                if (this.#getCategoryPosition(obj) !== -1) {
                    throw new AllergenInTheListException();
                } else {
                    this.#allergens.push(obj);
                }
            }
        }


        // Método para eliminar un alérgeno
        removeAllergen(...allergenToRemove) {
            for (const allergen of allergenToRemove) {

                // Sacamos la posición
                let position = this.#allergens.findIndex((elemento) => elemento.name === allergen.name);

                // Verificar si el alergeno esta registrado
                if (position === -1) {
                    throw new Error("El alergeno no existe.");
                }


                // Eliminar el alergeno del sistema
                this.#allergens.splice(position, 1);
            }
        }


        // Método para añadir un plato
        addDish(...dishToAdd) {
            for (const dish of dishToAdd) {
                // Verificar si dishToAdd es una instancia de la clase Dish
                if (!(dish instanceof Dish)) {
                    throw new Error("El plato no es un objeto Dish.");
                }

                //Verifcar que el plato no es null
                if (dish === null) {
                    throw new Error("El plato es Null.");
                }

                // Sacamos la posición
                let position = this.#dishes.findIndex((elemento) => elemento.name === dish.name);

                // Verificar si el plato ya existe
                if (position !== -1) {
                    throw new Error("El plato ya existe.");
                }

                let obj =

                    // Añadir el plato al sistema
                    this.#dishes.push(dish, {
                        categories: [],
                        allergens: [],
                        menu: []
                    });
            }

            // Permitir encadenar llamadas
            return this;
        }


        // Método para eliminar un plato
        //Elimina un plato y si también lo eliminara de categorias, alergenos y menus
        removeDish(...dishes) {
            for (const dish of dishes) {
                if (!(dish instanceof Dish)) {
                    throw new Error("El plato no es un objeto Dish.");
                }

                //Buscamos  si el plato existe y si es asi lo eliminamos
                let position = this.#getDishPosition(dish);
                if (position !== -1) {
                    this.#dishes.splice(position, 1);

                    // Buscamos en las categorias y si lo encontramos borramos el plato
                    for (const category of this.#categories) {
                        let categoryPosition = this.#getCategoryPosition(category);

                        let objCategory = this.#categories[categoryPosition];

                        // Verificar si objCategory es undefined antes de acceder a dishes
                        if (objCategory && objCategory.dishes) {
                            let dishIndex = objCategory.dishes.findIndex((busqueda) => busqueda === dish);

                            if (dishIndex !== -1) {
                                objCategory.dishes.splice(dishIndex, 1);
                            }
                        }
                    }


                    // Buscamos en los alergenos y si lo encontramos borramos el plato
                    for (const allergen of this.#allergens) {
                        let allergenPosition = this.#getAllergenPosition(allergen);

                        let objAllergen = this.#allergens[allergenPosition];

                        // Verificar si objAllergen es undefined antes de acceder a dishes
                        if (objAllergen && objAllergen.dishes) {
                            let dishIndex = objAllergen.dishes.findIndex((busqueda) => busqueda === dish);
                            if (dishIndex !== -1) {
                                objAllergen.dishes.splice(dishIndex, 1);
                            }
                        }
                    }


                    // Buscamos en los menus y si lo encontramos borramos el plato
                    for (const menu of this.#menus) {
                        let menuPosition = this.#getMenuPosition(menu);

                        let objMenu = this.#menus[menuPosition];

                        // Verificar si objAllergen es undefined antes de acceder a dishes
                        if (objMenu && objMenu.dishes) {
                            let dishIndex = objMenu.dishes.findIndex((busqueda) => busqueda === dish);

                            if (dishIndex !== -1) {
                                objMenu.dishes.splice(dishIndex, 1);
                            }
                        }
                    }

                } else {
                    throw new Error("Dish no existe en esta lista");
                }
            }
        }



        // Método para añadir un restaurante
        addRestaurant(...restaurantToAdd) {
            for (const restaurant of restaurantToAdd) {
                // Verificar si restaurantToAdd es una instancia de la clase Restaurant
                if (!(restaurant instanceof Restaurant)) {
                    throw new Error("El restaurante no es un objeto Restaurant.");
                }

                //Verifcar que el restaurante no es null
                if (restaurant === null) {
                    throw new Error("La categoría es Nula.");
                }

                // Sacamos la posición
                let position = this.#restaurants.findIndex((elemento) => elemento.name === restaurant.name)

                // Verificar si la categoría ya existe
                if (position !== -1) {
                    throw new Error("La categoría ya existe.");
                }

                // Añadir el restaurante al sistema
                this.#restaurants.push(restaurant);
            }

            // Permitir encadenar llamadas
            return this;
        }


        // Método para eliminar un restaurante
        removeRestaurant(...restaurantToRemove) {
            for (const restaurant of restaurantToRemove) {

                // Sacamos la posición
                let position = this.#restaurants.findIndex((elemento) => elemento.name === restaurant.name);

                // Verificar si el restaurante esta registrado
                if (position === -1) {
                    throw new Error("El restaurante no existe.");
                }

                // Eliminar el restaurante del sistema
                this.#restaurants.splice(position, 1);
            }
        }


        // Método para asignar un plato a una categoría
        assignCategoryToDish(cat, ...dishes) {
            //primero nos aseguramos que introducimos un tipo de categoria
            if (!(cat instanceof Category)) {
                throw new CategoryException();
            }
            if (cat === null) {
                throw new EmptyValueException();
            }

            //segundo tenemos que encontrar la categoria
            let obj = { category: cat };
            let categoryPosition = this.#getCategoryPosition(obj);
            if (categoryPosition !== -1) {
                //Buscar la posición del plato en la categoria
                //vamos pasando por cada plato
                for (let di of dishes) {
                    if (!(di instanceof Dish)) {
                        throw new DishException();
                    }
                    if (di === null) {
                        throw new EmptyValueException();
                    }

                    //comprobamos si el plato existe en nuestra colección de platos, y si no existe lo añadimos
                    if (this.#getDishPosition(di) === -1) {
                        this.addDish(di);
                    }

                    let objCategory = this.#categories[categoryPosition];
                    let dishIndex = objCategory.dishes.findIndex(
                        (busqueda) => busqueda.name === di.name
                    );

                    if (dishIndex !== -1) {
                        throw new DishInTheListException();
                    } else {
                        this.#categories[categoryPosition].dishes.push(di);
                    }
                }
            } else {
                //si la categoría no existe se crea
                this.addCategory(cat);
                //como ya vamos a tener esa categoría, para no repetir el código volvemos a llamar al método
                //para que añada los plato ya que hemos creado la caegoría
                this.assignCategoryToDish(cat, ...dishes);
            }
        }


        // Método para asignar un plato a una alegeria
        assignAllergenToDish(allergenName, ...dishes) {
            //primero nos aseguramos que introducimos un tipo de categoria
            if (!(allergenName instanceof Allergen)) {
                throw new AllergenException();
            }
            if (allergenName === null) {
                throw new EmptyValueException();
            }

            //segundo tenemos que encontrar la categoria
            let obj = { allergen: allergenName };
            let allergenPosition = this.#getAllergenPosition(obj);
            if (allergenPosition !== -1) {
                //Buscar la posición del plato en la categoria
                //vamos pasando por cada plato
                for (let di of dishes) {
                    if (!(di instanceof Dish)) {
                        throw new DishException();
                    }
                    if (di === null) {
                        throw new EmptyValueException();
                    }

                    //comprobamos si el plato existe en nuestra colección de platos, y si no existe lo añadimos
                    if (this.#getDishPosition(di) === -1) {
                        this.addDish(di);
                    }

                    let objCategory = this.#allergens[allergenPosition];
                    let dishIndex = objCategory.dishes.findIndex(
                        (busqueda) => busqueda.name === di.name
                    );

                    if (dishIndex !== -1) {
                        throw new DishInTheListException();
                    } else {
                        this.#allergens[allergenPosition].dishes.push(di);
                    }
                }
            } else {
                //si la categoría no existe se crea
                this.addAllergen(allergenName);
                //como ya vamos a tener esa categoría, para no repetir el código volvemos a llamar al método
                //para que añada los plato ya que hemos creado la caegoría
                this.assignAllergenToDish(allergenName, ...dishes);
            }
        }


        // Método para asignar un plato a un menu
        assignMenuToDish(menuName, ...dishes) {
            //primero nos aseguramos que introducimos un tipo de categoria
            if (!(menuName instanceof Menu)) {
                throw new CategoryException();
            }
            if (menuName === null) {
                throw new EmptyValueException();
            }

            //segundo tenemos que encontrar la categoria
            let obj = { menu: menuName };
            let menuPosition = this.#getMenuPosition(obj);
            if (menuPosition !== -1) {
                //Buscar la posición del plato en la categoria
                //vamos pasando por cada plato
                for (let di of dishes) {
                    if (!(di instanceof Dish)) {
                        throw new DishException();
                    }
                    if (di === null) {
                        throw new EmptyValueException();
                    }

                    //comprobamos si el plato existe en nuestra colección de platos, y si no existe lo añadimos
                    if (this.#getDishPosition(di) === -1) {
                        this.addDish(di);
                    }

                    let objMenu = this.#menus[menuPosition];
                    let dishIndex = objMenu.dishes.findIndex(
                        (busqueda) => busqueda.name === di.name
                    );

                    if (dishIndex !== -1) {
                        throw new DishInTheListException();
                    } else {
                        this.#menus[menuPosition].dishes.push(di);
                    }
                }
            } else {
                //si la categoría no existe se crea
                this.addMenu(menuName);
                //como ya vamos a tener esa categoría, para no repetir el código volvemos a llamar al método
                //para que añada los plato ya que hemos creado la caegoría
                this.assignMenuToDish(menuName, ...dishes);
            }
        }



        // Método para desasignar un plato de una categoría
        deassignCategoryToDish(categoryName, ...dishName) {
            // Verificar si Category es null
            if (categoryName === null) {
                throw new Error("La categoría es null.");
            }

            // Verificar si Dish es null
            if (dishName === null) {
                throw new Error("El plato es null.");
            }

            // Buscar la categoría en el sistema
            let category = this.#categories.find((cat) => cat.name === categoryName);

            // Verificar si la categoría no está registrada
            if (!category) {
                throw new Error("La categoría no está registrada.");
            }

            // Buscar el plato en el sistema
            let dish = this.#dishes.find((d) => d.name === dishName);

            // Verificar si el plato no está registrado
            if (!dish) {
                throw new Error("El plato no está registrado.");
            }

            // Desasignar el plato de la categoría
            category.dishes = category.dishes.filter((d) => d !== dish);

            // Desasignar la categoría del plato
            dish.categories = dish.categories.filter((cat) => cat !== category);

            // Permitir encadenar llamadas
            return this;
        }


        // Método para desasignar un plato de un alergeno
        deassignAllergenToDish(allergenName, ...dishName) {
            // Verificar si allergen es null
            if (allergenName === null) {
                throw new Error("El alergeno es null.");
            }

            // Verificar si Dish es null
            if (dishName === null) {
                throw new Error("El plato es null.");
            }

            // Buscar el alergeno en el sistema
            let allergen = this.#allergens.find((a) => a.name === allergenName);

            // Verificar si el alergeno no está registrada
            if (!allergen) {
                throw new Error("El alergeno no está registrada.");
            }

            // Buscar el plato en el sistema
            let dish = this.#dishes.find((d) => d.name === dishName);

            // Verificar si el plato no está registrado
            if (!dish) {
                throw new Error("El plato no está registrado.");
            }

            // Desasignar el plato del alergeno
            allergen.dishes = allergen.dishes.filter((d) => d !== dish);

            // Permitir encadenar llamadas
            return this;
        }



        // Método para desasignar un plato de un menu
        deassignMenuToDish(menuName, ...dishName) {
            // Verificar si menu es null
            if (menuName === null) {
                throw new Error("El menu es null.");
            }

            // Verificar si Dish es null
            if (dishName === null) {
                throw new Error("El plato es null.");
            }

            // Buscar el menu en el sistema
            let menu = this.#menus.find((cat) => cat.name === menuName);

            // Verificar si el menu no está registrada
            if (!menu) {
                throw new Error("El menu no está registrada.");
            }
            // Buscar el plato en el sistema
            let dish = this.#dishes.find((d) => d.name === dishName);

            // Verificar si el plato no está registrado
            if (!dish) {
                throw new Error("El plato no está registrado.");
            }

            // Desasignar el plato del menu
            menu.dishes = menu.dishes.filter((d) => d !== dish);

            // Permitir encadenar llamadas
            return this;
        }


        // Método para intercambiar las posiciones de dos platos en un menú
        changeDishesPositionsInMenu(menuName, dishName1, dishName2) {
            // Verificar si Menu es null
            if (menuName === null) {
                throw new Error("El menú es null.");
            }

            // Buscar el menú en el sistema
            let menu = this.#menus.find((m) => m.name === menuName);

            // Verificar si el menú no está registrado
            if (!menu) {
                throw new Error("El menú no está registrado.");
            }

            // Verificar si Dish1 es null
            if (dishName1 === null) {
                throw new Error("El primer plato es null.");
            }

            // Verificar si Dish2 es null
            if (dishName2 === null) {
                throw new Error("El segundo plato es null.");
            }

            // Buscar los platos en el menú
            let dish1 = menu.dishes.find((d) => d.name === dishName1);
            let dish2 = menu.dishes.find((d) => d.name === dishName2);

            // Verificar si los platos no están registrados en el menú
            if (!dish1) {
                throw new Error("El primer plato no está registrado en el menú.");
            }

            if (!dish2) {
                throw new Error("El segundo plato no está registrado en el menú.");
            }

            // Intercambiar las posiciones de los platos en el menú
            const index1 = menu.dishes.indexOf(dish1);
            const index2 = menu.dishes.indexOf(dish2);

            menu.dishes[index1] = dish2;
            menu.dishes[index2] = dish1;

            // Permitir encadenar llamadas
            return this;
        }

    }

    function init() {
        return new RestaurantsManager();
    }

    return {
        getInstance() {
            if (!instantiated) {
                instantiated = init();
            }
            return instantiated;
        },
    };
})();

export default RestaurantsManager;

// Exportar las clases
export { Dish, Category, Allergen, Menu, Restaurant, Coordinate };
