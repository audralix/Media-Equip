import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Directive({
  selector: '[appHasPermission]'
})
export class HasPermissionDirective {

  @Input('appHasPermission') permissions: string[];

  constructor(private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef) { }

  ngOnInit() {
    this.authService.getUser().subscribe(_ => {
      if (this.authService.hasPermission(this.permissions)) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }
}
