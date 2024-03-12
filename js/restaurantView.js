const EXCECUTE_HANDLER = Symbol('excecuteHandler');
import { Category } from './restaurant.js';
import { newCategoryValidation, newProductValidation, newRestaurantValidation, newAsDsMenuValidation } from './validation.js';
import { setCookie } from './util.js';


class RestaurantView {



    constructor() {
        this.main = document.getElementsByTagName('main')[0];
        this.categories = document.getElementById('categorias_principal');
        this.menu = document.querySelector('.barra__navegacion');
        this.platos = document.querySelector('.platos');
        this.categorias = document.querySelector('.categories');
        this.migas = document.querySelector('.breadcrumb');
        this.productWindow = null;
        this.openWindowMap = new Map();
    }

    [EXCECUTE_HANDLER](handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        const scroll = document.querySelector(scrollElement);
        if (scroll) scroll.scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }


    bindInit(handler) {
        document.getElementById('init').addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](
                handler,
                [],
                "body",
                { action: "init" },
                "#",
                event
            );
        });
        document.getElementById('logo').addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](
                handler,
                [],
                "body",
                { action: "init" },
                "#",
                event
            );
        });
    }

    showCategories(categories) {
        this.categorias.replaceChildren();
        if (this.categorias.children.length > 1)
            this.categorias.children[1].remove();
        const container = document.createElement('div');
        container.id = 'categorylist';
        container.classList.add("category");
        for (const category of categories) {
            container.insertAdjacentHTML('beforeend',
                `<div class="category__container">
                    <a data-category="${category.category.name}" href="#categorylist">
                        <div class="cat-list-image category__photo"><img alt="${category.category.name}"
                            src="./Imagenes/${category.category.name}.jpg" />
                        </div>
                        <div class="cat-list-text category_info">
                            <h3>${category.category.name}</h3>
                            <p>${category.category.description}</p>
                        </div>
                    </a>
                </div>`

            )
        };
        this.categorias.append(container);
    }


    showCategoriesInMenu(categories) {
        const navCats = document.getElementById('navCats');
        const container = navCats.nextElementSibling;
        container.replaceChildren();
        for (const category of categories) {
            container.insertAdjacentHTML('beforeend', `<li><a data-category="${category.category.name}" class="dropdown-item" href="#categorylist">${category.category.name}</a></li>`);
        }
    }


    showAllergensInMenu(allergens) {
        const div = document.createElement('div');
        div.id = 'allergen-list';
        div.classList.add('nav-item');
        div.classList.add('dropdown');
        div.insertAdjacentHTML('beforeend',
            `<a class="nav-link dropdown-toggle"
            href="#allergenlist" id="navAlls" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            Alergenos</a>`);
        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');
        for (const allergen of allergens) {
            container.insertAdjacentHTML('beforeend', `<div><a data-allergen="${allergen.allergen.name}" 
            class="dropdown-item" href="#allergen">${allergen.allergen.name}</a></div>`);
        }
        div.append(container);

        // Obtén una referencia al elemento con id "language"
        const languageElement = document.getElementById("language");

        // Insertar el nuevo elemento antes del elemento con id "language"
        this.menu.insertBefore(div, languageElement);
    }

    showMenusInMenu(menus) {
        const div = document.createElement('div');
        div.id = 'menu-list';
        div.classList.add('nav-item');
        div.classList.add('dropdown');
        div.insertAdjacentHTML('beforeend',
            `<a class="nav-link dropdown-toggle"
            href="#menulist" id="navMen" role="button"
            data-bs-toggle="dropdown" aria-expanded="false">
            Menus</a>`);
        const container = document.createElement('ul');
        container.classList.add('dropdown-menu');
        for (const menu of menus) {
            container.insertAdjacentHTML('beforeend', `<div><a data-menu="${menu.menu.name}" 
            class="dropdown-item" href="#menu">${menu.menu.name}</a></div>`);
        }
        div.append(container);

        // Obtén una referencia al elemento con id "language"
        const languageElement = document.getElementById("language");

        // Insertar el nuevo elemento antes del elemento con id "language"
        this.menu.insertBefore(div, languageElement);
    }

    showRestaurantsInMenu(restaurants) {
        const navRes = document.getElementById('navRes');
        const container = navRes.nextElementSibling;
        container.replaceChildren();
        for (const restaurant of restaurants) {
            container.insertAdjacentHTML('beforeend', `<li><a data-restaurant="${restaurant.name}" class="dropdown-item" href="#restaurantlist">${restaurant.name}</a></li>`);
        }
    }

    showDishes(dishes) {
        this.platos.replaceChildren();
        if (this.platos.children.length > 1)
            this.platos.children[1].remove();
        const container = document.createElement('div');
        container.classList.add("category");
        for (const dish of dishes) {
            let aleatorio = Math.floor(Math.random() * dish.dishes.length);
            container.insertAdjacentHTML('beforeend',
                `<div class="category__container">
                <a data-category="${dish.dishes[aleatorio].name}" href="#disheslist">
                <div class="cat-list-image category__photo"><img alt="${dish.dishes[aleatorio].name}"
                src="./Imagenes/${dish.dishes[aleatorio].name}.jpg" />
                </div>
                <div class="cat-list-text category_info">
                <h3>${dish.dishes[aleatorio].name}</h3>
                <p>${dish.dishes[aleatorio].description}</p>
                </div>
                </a>
                </div>`

            )
        };
        this.platos.append(container);
    }

    // Estas son las imagenes del inicio
    bindDishesCategoryList(handler) {
        const categoryList = document.getElementById('categorylist');
        const links = categoryList.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.dataset;
                this[EXCECUTE_HANDLER](
                    handler,
                    [category],
                    '#dish-list',
                    { action: 'CategoryList', category },
                    '#categorylist',
                    event,
                );
            });
        }
    }

    // Este es el desplegable de las categorias
    bindDishesCategoryListInMenu(handler) {
        const navCats = document.getElementById('navCats');
        const links = navCats.nextElementSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.dataset;
                this[EXCECUTE_HANDLER](
                    handler,
                    [category],
                    '#dish-list',
                    { action: 'CategoryList', category },
                    '#categorylist',
                    event,
                );
            });

        }
    }

    // Este es desplegable de los alergenos 
    bindDishesAllergenListInMenu(handler) {
        const navAlls = document.getElementById('navAlls');
        const links = navAlls.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { allergen } = event.currentTarget.dataset;
                this[EXCECUTE_HANDLER](
                    handler,
                    [allergen],
                    '#dish-list',
                    { action: 'AllergenListInMenu', allergen },
                    '#allergenlist',
                    event,
                );
            });
        }
    }

    bindDishesMenuListInMenu(handler) {
        const navMen = document.getElementById('navMen');
        const links = navMen.nextSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { menu } = event.currentTarget.dataset;
                this[EXCECUTE_HANDLER](
                    handler,
                    [menu],
                    '#dish-list',
                    { action: 'MenuListInMenu', menu },
                    '#menulist',
                    event,
                );
            });
        }
    }

    bindRestaurantListInMenu(handler) {
        const navRes = document.getElementById('navRes');

        const links = navRes.nextElementSibling.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { restaurant } = event.currentTarget.dataset;
                this[EXCECUTE_HANDLER](
                    handler,
                    [restaurant],
                    '#dish-list',
                    { action: 'RestaurantListInMenu', restaurant },
                    '#restaurantlist',
                    event,
                );
            });
        }
    }

    bindShowDetailsDishes(handler) {
        const productList = document.getElementById('dish-list');
        const links = productList.querySelectorAll('a');
        for (const link of links) {
            link.addEventListener('click', (event) => {
                const { category } = event.currentTarget.dataset;
                this[EXCECUTE_HANDLER](
                    handler,
                    [category],
                    '#dish-details',
                    { action: 'showProduct', category },
                    '#detailsDish',
                    event,
                );
            });
        }
    }

    listCategories(categories, title) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = ("dish-list");
        container.classList.add("dishes");

        for (const dish of categories) {
            container.insertAdjacentHTML('beforeend',
                `<div class="category__container">
                    <a data-category="${dish.name}">
                        <div class="cat-list-image category__photo"><img alt="${dish.name}"
                            src="./Imagenes/${dish.name}.jpg" />
                        </div>
                        <div class="cat-list-text category_info">
                            <h3>${dish.name}</h3>
                            <p>${dish.description}</p>
                        </div>
                    </a>
                </div>`
            )

        };

        this.platos.append(container);

    }


    listAllergens(allergens, title) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = ("dish-list");
        container.classList.add("dishes");

        for (const dish of allergens) {
            container.insertAdjacentHTML('beforeend',
                `<div class="category__container">
                    <a data-category="${dish.name}">
                        <div class="cat-list-image category__photo"><img alt="${dish.name}"
                            src="./Imagenes/${dish.name}.jpg" />
                        </div>
                        <div class="cat-list-text category_info">
                            <h3>${dish.name}</h3>
                            <p>${dish.description}</p>
                        </div>
                    </a>
                </div>`
            )

        };

        this.platos.append(container);

    }


    listMenus(menus, title) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = ("dish-list");
        container.classList.add("dishes");

        for (const dish of menus) {
            container.insertAdjacentHTML('beforeend',
                `<div class="category__container">
                    <a data-category="${dish.name}">
                        <div class="cat-list-image category__photo"><img alt="${dish.name}"
                            src="./Imagenes/${dish.name}.jpg" />
                        </div>
                        <div class="cat-list-text category_info">
                            <h3>${dish.name}</h3>
                            <p>${dish.description}</p>
                        </div>
                    </a>
                </div>`
            )

        };

        this.platos.append(container);

    }

    listRestaurant(restaurants, name) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.id = ("dish-list");
        container.classList.add('ficha');

        container.insertAdjacentHTML('beforeend',
            `<div class="ficha__container">
                <a data-category="${restaurants.name}">
                    <div class="ficha__imagen">
                    <img src="./Imagenes/restaurante.jpg" class="img-fluid" alt="${restaurants.name}">
                    </div>
                    <div class="ficha__info">
                        <h3>${restaurants.name}</h3>
                        <p>${restaurants.description}</p>
                    </div>
                </a>
            </div>`
        )



        this.platos.append(container);

    }


    showDetailsDishes(dish, message) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('mt-5');
        container.classList.add('mb-5');

        if (dish) {
            container.id = 'dish-details';
            container.classList.add(`${dish.name}-style`);
            container.insertAdjacentHTML('beforeend',
                `<div class="row d-flex
        justify-content-center">
                    <div class="col-md-10">
                        <div class="card">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="images p-3">
                                        <div class="text-center p-4"> <img id="main-image"
                                            src="./Imagenes/${dish.name}.jpg" /> </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="product p-4">
                                        <div class="mt-4 mb-3"><a href="#detailsDish"><span class="text-uppercasebrand">${dish.name}</span></a>
                                            <h5 class="text-uppercase">${dish.description}</h5>
                                            <div class="price d-flex flex-row align-items-center">


                                            </div>
                                        </div>
                                        <p class="about">${dish.description}</p>
                                        <div class="sizes mt-5">
                                            <h6 class="text-uppercase">Descripcion</h6>
                                            <p class="text-uppercase">${dish.ingredients}</p>
                                        </div>
                                        <div class="cart mt-4 align-items-center">
                                            <button id="b-buy" data-category="${dish.name}" class="btn btnprimary text-uppercase mr-2 px-4">Comprar</button>
                                            <button id="b-open" data-category="${dish.name}" class="btn btnprimary text-uppercase mr-2 px-4">Abrir en nueva ventana</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);

            container.insertAdjacentHTML('beforeend', '<button id="b-close" class="btn btn-primary text-uppercase m-2 px-4">Cerrar todas las ventanas</button>');

        } else {
            container.insertAdjacentHTML(
                'beforeend',
                `<div class="row d-flex justify-content-center">
                    ${message}
                </div>`,
            );
        }
        this.platos.append(container);
    }


    showProductInNewWindow(dish, message) {
        const main = this.productWindow.document.querySelector('main');
        const header = this.productWindow.document.querySelector('header nav');
        main.replaceChildren();
        header.replaceChildren();
        let container;
        if (dish) {
            container = document.createElement('div');
            container.id = 'dish-details';
            container.classList.add(`${dish.name}-style`);
            container.insertAdjacentHTML('beforeend',
                `<div class="row d-flex
        justify-content-center">
                    <div class="col-md-10">
                        <div class="card">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="images p-3">
                                        <div class="text-center p-4"> <img id="main-image"
                                            src="./Imagenes/${dish.name}.jpg" /> </div>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="product p-4">
                                        <div class="mt-4 mb-3"> <span class="text-uppercasebrand">${dish.name}</span>
                                            <h5 class="text-uppercase">${dish.description}</h5>
                                            <div class="price d-flex flex-row align-items-center">


                                            </div>
                                        </div>
                                        <p class="about">${dish.description}</p>
                                        <div class="sizes mt-5">
                                            <h6 class="text-uppercase">Descripcion</h6>
                                            <p class="text-uppercase">${dish.ingredients}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`);
            container.insertAdjacentHTML('beforeend', '<button class="btn btnprimary text-uppercase m-2 px-4"	onClick = "window.close()" > Cerrar</button > ');

        } else {
            container.insertAdjacentHTML(
                'beforeend',
                `<div class="row d-flex justify-content-center">
                    ${message}
                </div>`,
            );
        }
        main.append(container);
        this.productWindow.document.body.scrollIntoView();
    }

    bindShowProductInNewWindow(handler) {
        const bOpen = document.getElementById('b-open');

        bOpen.addEventListener('click', (event) => {
            const category = event.target.dataset.category;

            if (!this.openWindowMap.has(category)) {
                const newWindow = window.open('product.html', category,
                    'width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no,menubar = no, location = no');
                newWindow.addEventListener('DOMContentLoaded', () => {
                    handler(category);
                });
                this.openWindowMap.set(category, newWindow);
                this.productWindow = newWindow;
            } else {
                const openWindow = this.openWindowMap.get(category);
                openWindow.focus();
            }

            const bClose = document.getElementById('b-close');
            bClose.addEventListener('click', this.closeAllWindows.bind(this));
        });
    }

    closeAllWindows() {
        for (const [category, openWindow] of this.openWindowMap.entries()) {
            openWindow.close();
        }
        this.openWindowMap.clear();
    }

    showAdminMenu() {
        const menuOption = document.createElement('div');
        menuOption.classList.add('nav-item');
        menuOption.classList.add('dropdown');
        menuOption.insertAdjacentHTML(
            'afterbegin',
            `<a class="nav-link dropdown-toggle" href="#" id="navServices" role = "button" data-bs-toggle="dropdown" aria-expanded="false" > Adminitración</a > `,
        );
        const suboptions = document.createElement('ul');
        suboptions.classList.add('dropdown-menu');
        suboptions.insertAdjacentHTML('beforeend', `<li><a id="lnewCategory" class="dropdown-item" href ="#new-category" > Crear categoría</a ></li > `);
        suboptions.insertAdjacentHTML('beforeend', `<li><a id="ldelCategory" class="dropdown-item" href ="#del-category" > Eliminar categoría</a ></li > `);
        suboptions.insertAdjacentHTML('beforeend', `<li><a id="lnewProduct" class="dropdown-item" href ="#new-product" > Crear producto</a ></li > `);
        suboptions.insertAdjacentHTML('beforeend', `<li><a id="ldelProduct" class="dropdown-item" href ="#del-product" > Eliminar producto</a ></li > `);
        suboptions.insertAdjacentHTML('beforeend', `<li><a id="lnewRestaurant" class="dropdown-item" href ="#new-restaurant" > Crear restaurante</a ></li > `);
        suboptions.insertAdjacentHTML('beforeend', `<li><a id="lAsMenu" class="dropdown-item" href ="#asds-menu" >Asig-Desig Menu</a ></li > `);
        menuOption.append(suboptions);

        // Obtén una referencia al elemento con id "language"
        const languageElement = document.getElementById("language");

        // Insertar el nuevo elemento antes del elemento con id "language"
        this.menu.insertBefore(menuOption, languageElement);
    }

    showNewCategoryForm() {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-category';
        container.insertAdjacentHTML(
            'afterbegin',
            `<h1 class="display-5">Nueva categoría</h1>`,
        );
        container.insertAdjacentHTML(
            'beforeend',
            `<form name="fNewCategory" role="form" class="row g-3" novalidate>
				<div class="col-md-6 mb-3">
					<label class="form-label" for="ncTitle">Título *</label>
					<div class="input-group">
						<span class="input-group-text"><i class="bi bi-type"></i></span>
						<input type="text" class="form-control" id="ncTitle"
							name="ncTitle"
							placeholder="Título de categoría" value="" required>
							<div class="invalid-feedback">El título es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<label class="form-label" for="ncUrl">URL de la imagen *</label>
					<div class="input-group">
						<span class="input-group-text"><i class="bi bi-fileimage"></i></span>
						<input type="url" class="form-control" id="ncUrl" name="ncUrl"
							placeholder="URL de la imagen"
							value="" required>
							<div class="invalid-feedback">La URL no es válida.</div>
							<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div class="col-md-12 mb-3">
					<label class="form-label" for="ncDescription">Descripción</label>
					<div class="input-group">
						<span class="input-group-text"><i class="bi bi-bodytext"></i></span>
						<input type="text" class="form-control" id="ncDescription"
							name="ncDescription" value="">
							<div class="invalid-feedback"></div>
							<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div class="mb-12">
					<button class="btn btn-primary" type="submit">Enviar</button>
					<button class="btn btn-primary" type="reset">Cancelar</button>
				</div>
			</form>`,
        );
        this.platos.append(container);
    }

    bindAdminMenu(hNewCategory, hRemoveCategory, hNewProductForm, hRemoveProduct, hNewRestaurantForm, hAsDsMenu) {
        const newCategoryLink = document.getElementById('lnewCategory');
        newCategoryLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hNewCategory, [], '#new-category', {
                action:
                    'newCategory'
            }, '#', event);
        });

        const delCategoryLink = document.getElementById('ldelCategory');
        delCategoryLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hRemoveCategory, [], '#remove-category', {
                action: 'removeCategory'
            }, '#', event);
        });

        const newProductLink = document.getElementById('lnewProduct');
        newProductLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hNewProductForm, [], '#new-product', { action: 'newProduct' }, '#', event);
        });

        const delProductLink = document.getElementById('ldelProduct');
        delProductLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hRemoveProduct, [], '#remove-product', { action: 'removeProduct' }, '#', event);
        });

        const newRestaurantLink = document.getElementById('lnewRestaurant');
        newRestaurantLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hNewRestaurantForm, [], '#new-restaurant', { action: 'fNewRestaurant' }, '#', event);
        });

        const asMenuLink = document.getElementById('lAsMenu');
        asMenuLink.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](hAsDsMenu, [], '#as-menu', { action: 'fAsMenu' }, '#', event);
        });
    }

    showNewCategoryModal(done, cat, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const name = document.getElementById('messageModalTitle');
        name.innerHTML = 'Nueva Categoría';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría
		<strong>${cat.name}</strong> ha sido creada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> La categoría <strong>${cat.name}</strong> ya está
		creada.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewCategory.reset();
            }
            document.fNewCategory.ncTitle.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, {
            once: true
        });
    }

    bindNewCategoryForm(handler) {
        newCategoryValidation(handler);
    }

    showRemoveCategoryForm(categories) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1)
            this.categories.children[1].remove();
        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'remove-category';
        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5 text-center">Eliminar una categoría</h1>',
        );
        const row = document.createElement('div');
        row.classList.add('category')
        for (const category of categories) {
            row.insertAdjacentHTML('beforeend', `
                <div class="category__container">
                    <a data-category="${category.category.name}" href="#product-list">
                        <div class="cat-list-image category__photo"><img alt="${category.category.name}"
                            src="./Imagenes/${category.category.name}.jpg" />
                        </div>
                        <div class="cat-list-text category_info">
                            <h3>${category.category.name}</h3>
                            <p>${category.category.description}</p>
                        </div>
                        <div class="btn_elim"><button class="btn btn-primary" data-category="${category.category.name}" type='button'>Eliminar</button></div>
                    </a>
                </div>`);
        }
        container.append(row);
        this.platos.append(container);
    }

    showRemoveCategoryModal(done, cat, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');
        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Borrado de categoría';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">La categoría
		<strong>${cat.category.name}</strong> ha sido eliminada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3">
                    <i class="bi bi-exclamation-triangle"></i>
                    La categoría <strong>${cat.category.name}</strong> no se ha podido
                    borrar.</div>`,
            );
        }
        messageModal.show();
    }

    bindRemoveCategoryForm(handler) {
        const removeContainer = document.getElementById('remove-category');
        const buttons = removeContainer.getElementsByTagName('button');
        for (const button of buttons) {
            button.addEventListener('click', function (event) {
                handler(this.dataset.category);
            });
        }
    }

    showNewProductForm(categories, allergens) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();

        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-product';

        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Nuevo producto</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fNewProduct';
        form.setAttribute('role', 'form');
        form.setAttribute('novalidate', '');
        form.classList.add('row');
        form.classList.add('g-3');

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npSerial">Nombre *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <input type="text" class="form-control" id="npSerial" name="npSerial" value="" required>
                        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npUrl">URL *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-card-image"></i></span>
                        <input type="url" class="form-control" id="npUrl" name="npUrl"
                            placeholder="http://www.test.es" value="" min="0" step="1" required>
                        <div class="invalid-feedback">La URL no es válida.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npCategories">Categorías *</label>
                    <div class="input-group">
                        <label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="npCategories" id="npCategories" multiple required>
                        </select>
                        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        const npCategories = form.querySelector('#npCategories');
        for (const category of categories) {
            npCategories.insertAdjacentHTML('beforeend', `<option value="${category.category.name}">${category.category.name}</option>`);
        }

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npAllergen">Alergenos *</label>
                    <div class="input-group">
                        <label class="input-group-text" for="npAllergen"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="npAllergen" id="npAllergen" multiple required>
                        </select>
                        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        const npAllergen = form.querySelector('#npAllergen');
        for (const allergen of allergens) {
            npAllergen.insertAdjacentHTML('beforeend', `<option value="${allergen.allergen.name}">${allergen.allergen.name}</option>`);
        }

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-4 mb-0">
                    <label class="form-label" for="npDescription">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="npDescription" name="npDescription" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-3 mb-0">
                    <label class="form-label" for="npIngredients">Ingredintes</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="npIngredients" name="npIngredients" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="mb-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div>`,
        );

        container.append(form);
        this.platos.append(container);
    }


    showNewProductModal(done, dish, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Nuevo Plato';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> no ha podido crearse correctamente.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewProduct.reset();
            }
            document.fNewProduct.npSerial.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
    }

    bindNewProductForm(handler) {
        newProductValidation(handler);
    }


    showRemoveProductForm(categories) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();

        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'remove-product';

        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Eliminar un plato</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fNewProduct';
        form.setAttribute('role', 'form');
        form.setAttribute('novalidate', '');
        form.classList.add('row');
        form.classList.add('g-3');

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-6 mb-3">
                    <label class="form-label" for="npCategories">Categorías del producto</label>
                    <div class="input-group">
                        <label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="rpCategories" id="rpCategories">
                            <option disabled selected>Selecciona una categoría</option>
                        </select>
                    </div>
                </div>`,
        );
        const rpCategories = form.querySelector('#rpCategories');
        for (const category of categories) {
            rpCategories.insertAdjacentHTML('beforeend', `<option value="${category.category.name}">${category.category.name}</option>`);
        }

        container.append(form);
        container.insertAdjacentHTML(
            'beforeend',
            '<div id="product-list" class="container my-3"><div class="row"></div></div>',
        );

        this.platos.append(container);
    }

    bindRemoveProductSelects(hCategories) {
        const rpCategories = document.getElementById('rpCategories');
        rpCategories.addEventListener('change', (event) => {
            this[EXCECUTE_HANDLER](
                hCategories,
                [event.currentTarget.value],
                '#remove-product',
                { action: 'removeProductByCategory', category: event.currentTarget.value },
                '#remove-product',
                event,
            );
        });
    }


    showRemoveProductList(categories) {
        const listContainer = document.getElementById('product-list').querySelector('div.row');
        listContainer.replaceChildren();

        let exist = false;
        for (const category of categories) {
            exist = true;
            listContainer.insertAdjacentHTML('beforeend', `<div class="col-md-4 rProduct">
                    <figure class="card card-product-grid card-lg"> <a data-serial="${category.name}" href="#single-product" class="img-wrap"><img class="${category.name}-style" src="./Imagenes/${category.name}.jpg"></a>
                        <figcaption class="info-wrap">
                            <div class="row">
                                <div class="col-md-8"> <a data-serial="${category.name}" href="#single-product" class="title">${category.name} - ${category.name}</a> </div>
                                <div class="col-md-4">
                                    <div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                                </div>
                            </div>
                        </figcaption>
                        <div class="bottom-wrap"> <a href="#" data-serial="${category.name}" class="btn btn-primary float-right"> Eliminar </a>
                            <div class="price-wrap"> <span class="price h5">${category.name}</span> <br> <small class="text-success">Free shipping</small> </div>
                        </div>
                    </figure>
                </div>`);
        }
        if (!exist) {
            listContainer.insertAdjacentHTML('beforeend', '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría o tipo.</p>');
        }
    }

    bindRemoveProduct(handler) {
        const productList = document.getElementById('product-list');
        const buttons = productList.querySelectorAll('a.btn');
        for (const button of buttons) {
            button.addEventListener('click', function (event) {
                handler(this.dataset.serial);
                event.preventDefault();
            });
        }
    }

    showRemoveProductModal(done, product, error) {
        const productList = document.getElementById('product-list');
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Producto eliminado';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${product.name}</strong> ha sido eliminado correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${product.name}</strong> no existe en el manager.</div>',
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                const button = productList.querySelector(`a.btn[data-serial="${product.name}"]`);
                button.parentElement.parentElement.parentElement.remove();
            }
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
    }

    // Formulario de asignacion o desasignacion junto con orden de los menus
    showNewProductForm(categories, allergens) {
        this.platos.replaceChildren();
        if (this.categories.children.length > 1) this.categories.children[1].remove();

        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-product';

        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Nuevo producto</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fNewProduct';
        form.setAttribute('role', 'form');
        form.setAttribute('novalidate', '');
        form.classList.add('row');
        form.classList.add('g-3');

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npSerial">Nombre *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <input type="text" class="form-control" id="npSerial" name="npSerial" value="" required>
                        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npUrl">URL *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-card-image"></i></span>
                        <input type="url" class="form-control" id="npUrl" name="npUrl"
                            placeholder="http://www.test.es" value="" min="0" step="1" required>
                        <div class="invalid-feedback">La URL no es válida.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npCategories">Categorías *</label>
                    <div class="input-group">
                        <label class="input-group-text" for="npCategories"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="npCategories" id="npCategories" multiple required>
                        </select>
                        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        const npCategories = form.querySelector('#npCategories');
        for (const category of categories) {
            npCategories.insertAdjacentHTML('beforeend', `<option value="${category.category.name}">${category.category.name}</option>`);
        }

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="npAllergen">Alergenos *</label>
                    <div class="input-group">
                        <label class="input-group-text" for="npAllergen"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="npAllergen" id="npAllergen" multiple required>
                        </select>
                        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        const npAllergen = form.querySelector('#npAllergen');
        for (const allergen of allergens) {
            npAllergen.insertAdjacentHTML('beforeend', `<option value="${allergen.allergen.name}">${allergen.allergen.name}</option>`);
        }

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-4 mb-0">
                    <label class="form-label" for="npModel">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="npDescription" name="npDescription" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-3 mb-0">
                    <label class="form-label" for="npModel">Ingredintes</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="npIngredients" name="npIngredients" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );
        form.insertAdjacentHTML(
            'beforeend',
            `<div class="mb-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div>`,
        );

        container.append(form);
        this.platos.append(container);
    }

    // Modal de que se a asignado o desasignado todo bien o cambiado el orden
    showNewProductModal(done, dish, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Nuevo Plato';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> no ha podido crearse correctamente.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewProduct.reset();
            }
            document.fNewProduct.npSerial.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
    }


    // Mandamos la informacion a validar
    bindNewProductForm(handler) {
        newProductValidation(handler);
    }






    // Visualizacion de la creación de restaurantes
    showNewRestaurantForm() {
        this.platos.replaceChildren();

        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-restaurant';

        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Nuevo restaurante</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fNewRestaurant';
        form.setAttribute('role', 'form');
        form.setAttribute('novalidate', '');
        form.classList.add('row');
        form.classList.add('g-3');

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="nrName">Nombre *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <input type="text" class="form-control" id="nrName" name="nrName" value="" required>
                        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-5 mb-3">
                    <label class="form-label" for="nrLocation">Localización</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <input type="text" class="form-control" id="nrLocation" name="nrLocation" value="" required>
                        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-4 mb-0">
                    <label class="form-label" for="nrDescription">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="nrDescription" name="nrDescription" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="mb-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div>`,
        );

        container.append(form);
        this.platos.append(container);
    }

    // Modal que nos indicaraque todo fue bien creado

    showNewRestaurantModal(done, restaurant, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Nuevo Restaurante';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El restaurante <strong>${restaurant.name}</strong> ha sido creada correctamente.</div>`);
        } else {
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El restaurante <strong>${restaurant.name}</strong> no ha podido crearse correctamente.</div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fNewRestaurant.reset();
            }
            document.fNewRestaurant.nrName.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
    }

    // Con esto enlazamos la validación
    bindNewRestaurantForm(handler) {
        newRestaurantValidation(handler);
    }

    showAsMenuForm(dishes, menus) {
        this.platos.replaceChildren();

        const container = document.createElement('div');
        container.classList.add('container');
        container.classList.add('my-3');
        container.id = 'new-product';

        container.insertAdjacentHTML(
            'afterbegin',
            '<h1 class="display-5">Nuevo producto</h1>',
        );

        const form = document.createElement('form');
        form.name = 'fAsMenu';
        form.setAttribute('role', 'form');
        form.setAttribute('novalidate', '');
        form.classList.add('row');
        form.classList.add('g-3');

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-12 mb-3 input-group">
                    <label class="input-group-text" for="asDish" style="color: #c93737">* Platos</label>
                    <select class="form-select" name="asDish" id="asDish" requiered>
                        <option selected>Selecciona...</option>
                    </select>
                    <div class="invalid-feedback">El tipo es obligatorio.</div>
                    <div class="valid-feedback">Correcto.</div>
                </div>`,
        );

        const asDish = form.querySelector('#asDish');
        for (const dish of dishes) {
            asDish.insertAdjacentHTML('beforeend', `<option value="${dish}">${dish.name}</option>`);
        }


        form.insertAdjacentHTML(
            'beforeend',
            `<div class="col-md-8 mb-3">
                    <label class="form-label" for="asMenu">Menus *</label>
                    <div class="input-group">
                        <label class="input-group-text" for="asMenu"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="asMenu" id="asMenu" multiple required>
                        </select>
                        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`,
        );

        const asMenu = form.querySelector('#asMenu');
        for (const menu of menus) {
            asMenu.insertAdjacentHTML('beforeend', `<option value="${menu.menu}">${menu.menu.name}</option>`);
        }

        form.insertAdjacentHTML(
            'beforeend',
            `<div class="mb-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                </div>`,
        );

        container.append(form);
        this.platos.append(container);
    }

    showNewProductModal(done, dish, menu, error) {
        const messageModalContainer = document.getElementById('messageModal');
        const messageModal = new bootstrap.Modal('#messageModal');

        const title = document.getElementById('messageModalTitle');
        title.innerHTML = 'Plato asignado';
        const body = messageModalContainer.querySelector('.modal-body');
        body.replaceChildren();
        if (done) {
            body.insertAdjacentHTML('afterbegin', `<div class="p-3">El plato <strong>${dish.name}</strong> se agrego correctamente al menu <strong>${menu.menu.name}</strong> </div>`);
        } else {
            menu
            body.insertAdjacentHTML(
                'afterbegin',
                `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El plato <strong>${dish.name}</strong> no pudo agregarse correctamente al menu <strong>${menu.menu.name}</strong> </div>`,
            );
        }
        messageModal.show();
        const listener = (event) => {
            if (done) {
                document.fAsMenu.reset();
            }
            document.fAsMenu.asMenu.focus();
        };
        messageModalContainer.addEventListener('hidden.bs.modal', listener, { once: true });
    }


    // Mandamos la informacion a validar
    bindNewAsDsMenuForm(handler) {
        newAsDsMenuValidation(handler);
    }

    showCookiesMessage() {
        const toast = `<div class="fixed-top p-5 mt-5">
            <div id="cookies-message" class="toast fade show bg-dark text-white
        w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <h4 class="me-auto">Aviso de uso de cookies</h4>
                    <button type="button" class="btn-close" data-bs-dismiss="toast"
                        aria-label="Close" id="btnDismissCookie"></button>
                </div>
                <div class="toast-body p-4 d-flex flex-column">
                    <p>
                        Este sitio web almacenda datos en cookies para activar su
                        funcionalidad, entre las que se encuentra
                        datos analíticos y personalización. Para poder utilizar este
                        sitio, estás automáticamente aceptando
                        que
                        utilizamos cookies.
                    </p>
                    <div class="ml-auto">
                        <button type="button" class="btn btn-outline-light mr-3 deny"
                            id="btnDenyCookie" data-bs-dismiss="toast">
                            Denegar
                        </button>
                        <button type="button" class="btn btn-primary"
                            id="btnAcceptCookie" data-bs-dismiss="toast">
                            Aceptar
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('afterbegin', toast);

        const cookiesMessage = document.getElementById('cookies-message');
        cookiesMessage.addEventListener('hidden.bs.toast', (event) => {
            event.currentTarget.parentElement.remove();
        });

        const denyCookieFunction = (event) => {
            this.platos.replaceChildren();
            this.platos.insertAdjacentHTML('afterbegin', `<div class="container my3"><div class="alert alert-warning" role="alert">
            <strong>Para utilizar esta web es necesario aceptar el uso de
            cookies. Debe recargar la página y aceptar las condicones para seguir
            navegando. Gracias.</strong>
            </div></div>`);
            this.categories.remove();
            this.menu.remove();
        };
        const btnDenyCookie = document.getElementById('btnDenyCookie');
        btnDenyCookie.addEventListener('click', denyCookieFunction);
        const btnDismissCookie = document.getElementById('btnDismissCookie');
        btnDismissCookie.addEventListener('click', denyCookieFunction);

        const btnAcceptCookie = document.getElementById('btnAcceptCookie');
        btnAcceptCookie.addEventListener('click', (event) => {
            setCookie('accetedCookieMessage', 'true', 1);
        });

    }

    showIdentificationLink() {
        // Accede al área de usuario
        const userArea = document.getElementById("userArea");
        // Limpia el área
        userArea.replaceChildren();
        userArea.insertAdjacentHTML(
            "afterbegin",
            `<div
				class="account d-flex
		mx-2 flex-column"
				style="text-align: right; height: 40px"
			>
				<a id="login" href="#">
					<i class="bi bi-person-circle" ariahidden="true"></i> Identificate
				</a>
			</div>`
        );
    }

    bindIdentificationLink(handler) {
        const login = document.getElementById('login');
        login.addEventListener('click', (event) => {
            this[EXCECUTE_HANDLER](handler, [], 'platos', { action: 'login' }, '#',
                event);
        });
    }

    showLogin() {
        this.platos.replaceChildren();
        const login = `<div class="container h-100">
        <div class="d-flex justify-content-center h-100">
            <div class="user_card" style="background-color: #d9d9d9;">
                <div class="d-flex justify-content-center form_container">
                    <form name="fLogin" role="form" novalidate>
                        <div class="input-group mb-3">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fa-regular fa-user"></i></span>
                            </div>
                            <input type="text" name="username" class="form-control input_user" value="" placeholder="usuario">
                        </div>
                        <div class="input-group mb-2">
                            <div class="input-group-append">
                                <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                            </div>
                            <input type="password" name="password" class="form-control input_pass" value="" placeholder="contraseña">
                        </div>
                        <div class="form-group">
                            <div class="custom-control custom-checkbox">
                                <input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
                                <label class="custom-control-label" for="customControlInline">Recuérdame</label>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center mt-3 login_container">
                            <button class="btn login_btn" type="submit">Acceder</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
        this.platos.insertAdjacentHTML('afterbegin', login);
    }

    bindLogin(handler) {
        const form = document.forms.fLogin;
        form.addEventListener('submit', (event) => {
            handler(form.username.value, form.password.value, form.remember.checked);
            event.preventDefault();
        });
    }

    showInvalidUserMessage() {
        this.platos.insertAdjacentHTML('beforeend', `<div class="container my3"><div class="alert alert-warning" role="alert">
        <strong>El usuario y la contraseña no son válidos. Inténtelo
        nuevamente.</strong>
        </div></div>`);
        document.forms.fLogin.reset();
        document.forms.fLogin.username.focus();
    }

    initHistory() {
        history.replaceState({ action: "init" }, null);
    }

    showAuthUserProfile(user) {
        const userArea = document.getElementById('userArea');
        userArea.replaceChildren();
        userArea.insertAdjacentHTML('afterbegin', `<div class="account"">
        ${user.username} <a id="aCloseSession" href="#">Cerrar sesión</a>
        </div>`);
    }

    setUserCookie(user) {
        setCookie('activeUser', user.username, 1);
    }


    deleteUserCookie() {
        setCookie('activeUser', '', 0);
    }

    removeAdminMenu() {
        const adminMenu = document.getElementById('navServices');
        if (adminMenu) adminMenu.parentElement.remove();
    }

    bindCloseSession(handler) {
        document.getElementById('aCloseSession').addEventListener('click',
            (event) => {
                handler();
                event.preventDefault();
            });
    }

    bindLanguageSelection(handler) {
        const lFlags =
            document.getElementById('language').querySelectorAll('ul.dropdown-menu a');
        for (const link of lFlags) {
            link.addEventListener('click', (event) => {
                const { language } = event.currentTarget.dataset;
                handler(language);
                localStorage.setItem('language', language);
                event.preventDefault();
            });
        }
    }

    // Cambia la bandera
    showSelectedLanguage(language) {
        const selectedLanguage = document.querySelector("#languageDropdown img");
        selectedLanguage.src = `./Imagenes/languages/${language}.png`;
    }

    // Devuelve el idioma del localStorage
    getLanguage() {
        return localStorage.getItem("language");
    }

}

export default RestaurantView;