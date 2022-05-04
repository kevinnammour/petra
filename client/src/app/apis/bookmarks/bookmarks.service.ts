/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private proxy = 'http://localhost/petra/server/apis/bookmarks';
  constructor(private http: HttpClient) {}

  getBookmarks() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get(`${this.proxy}/get_bookmarks.php`, { headers });
  }

  removeBookmark(activity_id: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.post(
      `${this.proxy}/remove_bookmark.php`,
      {
        activity_id,
      },
      { headers }
    );
  }
}
