import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddImageGroupResponse,
  AddImageGroupVariantResponse,
  DeleteImageGroupResposne,
  DeleteImageGroupVariantResponse,
  GetImageGroupResponse,
  GetImageGroupVariantResponse,
  ImageGroupVariant,
  ListImageGroupVariantsResponse,
  ListImageGroupsResponse,
} from './api.types';
import { map } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  listImageGroups() {
    const url = this.route('/group');
    const req = this.http.get<ListImageGroupsResponse>(url);

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
        else return res.result.groups;
      }),
    );
  }

  getImageGroup(groupId: string) {
    const url = this.route(`/group/${groupId}`);
    const req = this.http.get<GetImageGroupResponse>(url);

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
        else return res.result.group;
      }),
    );
  }

  addImageGroup(name: string) {
    const url = this.route('/group');
    const req = this.http.post<AddImageGroupResponse>(url, { name });

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
        else return res.result.group;
      }),
    );
  }

  deleteImageGroup(groupId: string) {
    const url = this.route(`/group/${groupId}`);
    const req = this.http.delete<DeleteImageGroupResposne>(url);

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
      }),
    );
  }

  listImageGroupVariants(groupId: string) {
    const url = this.route(`/group/${groupId}/variant`);
    const req = this.http.get<ListImageGroupVariantsResponse>(url);

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
        else return res.result.variants;
      }),
    );
  }

  getImageGroupVariant(groupId: string, variant: string) {
    const url = this.route(`/group/${groupId}/variant/${variant}`);
    const req = this.http.get<GetImageGroupVariantResponse>(url);

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
        else return res.result.variant;
      }),
    );
  }

  addImageGroupVariant(
    groupId: string,
    variant: Omit<ImageGroupVariant, 'id'>,
  ) {
    const url = this.route(`/group/${groupId}/variant`);
    const req = this.http.post<AddImageGroupVariantResponse>(url, {
      ...variant,
    });

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
        else return res.result.variant;
      }),
    );
  }

  deleteImageGroupVariant(groupId: string, variant: string) {
    const url = this.route(`/group/${groupId}/variant/${variant}`);
    const req = this.http.delete<DeleteImageGroupVariantResponse>(url);

    return req.pipe(
      map((res) => {
        if (!res.success) throw new Error(res.error);
      }),
    );
  }

  private route(route: string) {
    // return '/api' + route;
    return environment.API_URL + route;
  }
}
