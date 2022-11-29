import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

//App Routing set Up
// IntroGuard: Check if the user has already seen the intro and show the page if not
// AutoLoginGuard: Automatically log in a user on app startup if already authenticated before
// AuthGuard: Secure the internal pages of your app
//resource: https://devdactic.com/ionic-5-navigation-with-login
const routes: Routes = [
  /*   {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
 */
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canLoad: [IntroGuard, AutoLoginGuard],
  },
  {
    path: 'intro',
    loadChildren: () =>
      import('./intro/intro.module').then((m) => m.IntroPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  // This makes the app start with this page
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'intro',
    loadChildren: () =>
      import('./intro/intro.module').then((m) => m.IntroPageModule),
  },

  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((m) => m.ProductsPageModule),
  },

  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.module').then((m) => m.CartPageModule),
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register.module').then((m) => m.RegisterPageModule),
  },

  {
    path: 'addupdatemodal',
    loadChildren: () =>
      import('./addupdatemodal/addupdatemodal.module').then(
        (m) => m.AddupdatemodalPageModule
      ),
  },
  {
    path: 'itemregister',
    loadChildren: () =>
      import('./itemregister/itemregister.module').then(
        (m) => m.ItemregisterPageModule
      ),
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN',
    },
  },
  {
    path: 'camera',
    loadChildren: () =>
      import('./camera/camera.module').then((m) => m.CameraPageModule),
  },
  {
    path: 'subcategories',
    loadChildren: () =>
      import('./subcategories/subcategories.module').then(
        (m) => m.SubcategoriesPageModule
      ),
  },
  {
    path: 'product-detail',
    loadChildren: () =>
      import('./product-detail/product-detail.module').then(
        (m) => m.ProductDetailPageModule
      ),
  },
  {
    path: 'subcategories-detail',
    loadChildren: () =>
      import('./subcategories-detail/subcategories-detail.module').then(
        (m) => m.SubcategoriesDetailPageModule
      ),
  },
  {
    path: 'submission',
    loadChildren: () =>
      import('./submission/submission.module').then(
        (m) => m.SubmissionPageModule
      ),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./pages/account/account.module').then((m) => m.AccountPageModule),
  } /* ,
  {
    path: 'your-bag',
    loadChildren: () => import('./pages/your-bag/your-bag.module').then( m => m.YourBagPageModule)
  } */,
  {
    path: 'achieve',
    loadChildren: () =>
      import('./pages/achieve/achieve.module').then((m) => m.AchievePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
