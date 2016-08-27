using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
//using TodoListApplication.DBContext;
//using TodoListApplication.Models;
using TodoListApplication.Entity;


namespace TodoListApplication.Controllers
{
    public class CityController : Controller
    {
        TodoListEntities db = new TodoListEntities();

        public ActionResult Index()
        {
            return View();
        }


        //To get the list of City for the given  country
        public JsonResult GetCityLists(string sidx, string sord, int page, int rows, int countryid)  
        {
            int pageIndex = Convert.ToInt32(page) - 1;
            int pageSize = rows;
            var cityresult = db.Cities.Where(p => p.CountryID == countryid).Select(
                    a => new
                        {   a.CityID,
                            a.CityName,
                            a.CountryID,
                            a.Country.CountryName,
                            a.TotalPopulation
                    });
            int totalRecords = cityresult.Count();
            var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);
            if (sord.ToUpper() == "DESC")
            {
                cityresult = cityresult.OrderByDescending(s => s.CityName);
                cityresult = cityresult.Skip(pageIndex * pageSize).Take(pageSize);
            }
            else
            {
                cityresult = cityresult.OrderBy(s => s.CityName);
                cityresult = cityresult.Skip(pageIndex * pageSize).Take(pageSize);
            }
            var jsonData = new{
                 total = totalPages,
                 page,
                 records = totalRecords,
                 rows = cityresult
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        // TODO:insert a new row to the grid logic here
        [HttpPost]
        public string Create([Bind(Exclude = "CityID")] City objCity)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.Cities.Add(objCity);
                    db.SaveChanges();
                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfull";
                }
            }
            catch(Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Edit(City objCities)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(objCities).State = EntityState.Modified;
                    db.SaveChanges();
                    msg = "Saved Successfully";
                }
                else
                {
                    msg = "Validation data not successfull";
                }
            }
            catch (Exception ex)
            {
                msg = "Error occured:" + ex.Message;
            }
            return msg;
        }
        public string Delete(int Id)
        {
            City objCity = db.Cities.Find(Id);
            db.Cities.Remove(objCity);
            db.SaveChanges();
            return "Deleted successfully";
        }
    }
}
