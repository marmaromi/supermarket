# supermarket

A supermarket site - training project.

## built with:
- Database: 
  - MongoDB
- Backend: 
  - Typescript
  - Node.js
  - Express
- Frontend: 
  - Angular + TypeScript
  - CSS

## issues
- register email validation not consistent with backend validation - works without .com
- fix error messages for frontend (login wrong password ot username)
- fix horizontal collapse in user layout
- show cart in small screen and than enlarge it breaks layout
- shopping cart icon disappears on scrolling in phone mode
- NgRx store not updating correctly - current fix is setTimout to fetch cart after add/update
- product amount in shopping list not updating after cart update
- cart list box shadow in phone mode not looking good
- product image not updating live
- backend error for imageName in product update

## things to add
- add login message
- add page not found
- improve interceptor looks
- maybe better collapse: https://coreui.io/angular/docs/components/collapse
- double click to update address in order page
- credit card regex
- add site icon
