import Restaurant from './restaurant.js';
import RestaurantController from './restaurantController.js';
import RestaurantView from './restaurantView.js';
import AuthenticationService from './authentication.js';

const RestaurantApp = new RestaurantController(
    Restaurant.getInstance(),
    new RestaurantView(),
    AuthenticationService.getInstance());

export default RestaurantApp;