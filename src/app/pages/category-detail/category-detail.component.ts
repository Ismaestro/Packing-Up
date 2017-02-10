import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {CategoriesService} from '../../shared/services/categories.service';

@Component({
  selector: 'page-category-detail',
  templateUrl: 'category-detail.component.html'
})

export class CategoryDetailsPage {
  public category;
  public isNew = true;
  public action = 'add';

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private categoriesService: CategoriesService) {

    let editCategory = this.navParams.get('category');

    if (editCategory) {
      this.category = editCategory;
      this.isNew = false;
      this.action = 'edit';
    }
  }

  save(name) {
    this.category.id = name;
    if (this.isNew) {
      this.categoriesService.addCategory(this.category).then(() => {
        this.dismiss();
      });
    } else {
      this.categoriesService.updateCategory(this.category).then(() => {
        this.dismiss();
      });
    }
  }

  deleteCategory() {
    this.categoriesService.deleteCategory(this.category).then(() => {
      this.dismiss();
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  dismiss() {
    this.viewCtrl.dismiss().then(() => {
      location.reload();
    });
  }
}