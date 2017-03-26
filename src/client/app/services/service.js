/* eslint-disable no-unused-vars */
/** Movie service
*   This class will be where the you put Client side services
*  @todo get this to use $http
*/
export default (app)=>
{
  app.factory('movieList',function ()
{
  return [
    {  id: 1017109,
      title: 'Juno',
      genre: 'Drama',
  },
  {
      id: 1017105,
      title: 'Star Wars',
      genre: 'Sy-Fy',
  },
  {
      id: 1017108,
      title: 'Big',
      genre: 'Sy-FY',
  },
  {
      id: 1017104,
      title: 'Juno',
      genre: 'Drama',
  },
  {
      id: 1017106,
      title: 'IRObot',
      genre: 'Sy-FY',

  },
  {
      id: 4444441,
      title: 'Logan',
      genre: 'Sy-Fy',
  }
    ]
  })
}
