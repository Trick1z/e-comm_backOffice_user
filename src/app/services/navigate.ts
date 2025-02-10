import { Router } from '@angular/router';

export function nav(router: Router, path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    router.navigateByUrl(path).then(success => {
      if (success) {
        resolve();  // Promise is resolved when navigation is successful
      } else {
        reject('Navigation failed');  // Reject the promise if navigation fails
      }
    }).catch(err => {
      reject(err);  // Reject the promise on error
    });
  });
}
