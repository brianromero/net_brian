import {
  Component,
  OnInit,
  ElementRef,
  NgModule,
  ViewContainerRef,
  Compiler,
  ComponentFactory,
  ComponentRef,
  ViewChild
} from '@angular/core';
import {
  BrowserModule
} from '@angular/platform-browser';
import {
  RouterModule
} from '@angular/router';
import {
  Router,
  NavigationEnd
} from '@angular/router';
import {
  Location
} from '@angular/common';
import {
  AppConfig
} from '../../app.config';
import {
  SidebarService
} from './sidebar.service';
import {Helpers} from './../../helper';

declare var jQuery: any;

@Component({
  selector: '[sidebar]',
  templateUrl: './sidebar.template.html',
  providers: [SidebarService]
})

export class Sidebar implements OnInit {
    @ViewChild('mymenu', {
        read: ViewContainerRef
    }) target: ViewContainerRef;
    private cmpRef: ComponentRef < any > ;

  $el: any;
  config: any;
  router: Router;
  location: Location;

  constructor(config: AppConfig, el: ElementRef, router: Router, location: Location,
    private compiler: Compiler,
    private _viewContainerRef: ViewContainerRef,
    private sidebarservice: SidebarService) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
    this.location = location;
  }

  initSidebarScroll(): void {
    let $sidebarContent = this.$el.find('.js-sidebar-content');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px'
    });
  }

  changeActiveNavigationItem(location): void {
    let $newActiveLink = this.$el.find('a[href="#' + location.path() + '"]');

    // collapse .collapse only if new and old active links belong to different .collapse
    if (!$newActiveLink.is('.active > .collapse > li > a')) {
      this.$el.find('.active .active').closest('.collapse').collapse('hide');
    }
    this.$el.find('.sidebar-nav .active').removeClass('active');

    $newActiveLink.closest('li').addClass('active')
      .parents('li').addClass('active');

    // uncollapse parent
    $newActiveLink.closest('.collapse').addClass('in')
      .siblings('a[data-toggle=collapse]').removeClass('collapsed');
  }

  ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location);
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
    let id_usuario = this.getIdUsuario();
    let queryparameter = `?id_usuario=${id_usuario}`;
    if (id_usuario != "") {
      this.sidebarservice.getMenuLinks(queryparameter).subscribe(res => {
        localStorage.setItem('menu', JSON.stringify(res))
        let menustring = localStorage.getItem('menu')
        this.compileToComponent(res).then((factory: ComponentFactory < any > ) => {
          this.cmpRef = this.target.createComponent(factory)
        })
      })
    } else {
      this.compileToComponent("").then((factory: ComponentFactory < any > ) => {
        this.cmpRef = this.target.createComponent(factory)
      })
    }
  }

  ngOnInit(): void {
    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
    this.initSidebarScroll();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location);
      }
    });
  }

  getIdUsuario() {
    let session = Helpers.getJsonSession();
    console.log(session[0]['id_usuario'])
    return session[0]['id_usuario'] || '';
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
      this.cmpRef = null;
    }
  }

  private compileToComponent(template1: string): Promise < ComponentFactory < any >> {

    @Component({
      template: template1
    })
    class DynamicComponent {}

    @NgModule({
      imports: [BrowserModule, RouterModule],
      declarations: [DynamicComponent]
    })
    class DynamicModule {}

    return this.compiler.compileModuleAndAllComponentsAsync(DynamicModule).then(
      factory => factory.componentFactories.find(x => x.componentType === DynamicComponent)
    )
  }
}