import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ApiService } from './api.service';
import { environment } from 'src/environments/environment';
import { Menu } from '../model/menu';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  let dummyMenus = [{
      restField: "dynamicContent",
      title: "Dynamic Content",

      menus: [{
        restField: "news_doctos",
        title: "News (Doctors)",

        fields: [
        {
          restField: "date",
          title: "Date",
          type: "date"
        }, {
          restField: "title",
          title: "Title",
          type: "string"
        }]
      }]
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
      ],
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
  it('should return a list of menus', () => {
    service.getMenusAndFields().then(result => {
      expect(result).toBeTruthy();
      expect(result[0].menus).toBeTruthy();
      expect(result[0].menus[0].fields.length).toBe(2);
    });


    const req = httpMock.expectOne(`${environment.apiUrl}`);
    expect(req.request.url).toContain(`${environment.apiUrl}`);
    expect(req.request.method).toBe("GET");

    req.flush(dummyMenus);

  });
});
