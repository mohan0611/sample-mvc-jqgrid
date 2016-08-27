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
    public class CountryController : Controller
    {
        TodoListEntities db = new TodoListEntities();

        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult GetCountryLists(string sidx, string sord, int page, int rows)  //Gets the todo Lists.
        {
            int pageIndex = Convert.ToInt32(page) - 1;
            int pageSize = rows;
            var countryresult = db.Countries.Select(
                    a => new
                        {   a.CountryId,
                            a.CountryName, 
                            a.Primarylanguage
                        });
            int totalRecords = countryresult.Count();
            var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);
            if (sord.ToUpper() == "DESC")
            {
                countryresult = countryresult.OrderByDescending(s => s.CountryName);
                countryresult = countryresult.Skip(pageIndex * pageSize).Take(pageSize);
            }
            else
            {
                countryresult = countryresult.OrderBy(s => s.CountryName);
                countryresult = countryresult.Skip(pageIndex * pageSize).Take(pageSize);
            }
            var jsonData = new{
                 total = totalPages,
                 page,
                 records = totalRecords,
                 rows = countryresult
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        // TODO:insert a new row to the grid logic here
        [HttpPost]
        public string Create([Bind(Exclude = "CountryId")] Country objCountry)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.Countries.Add(objCountry);
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
        public string Edit(Country objCountry)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(objCountry).State = EntityState.Modified;
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
            Country objCountry = db.Countries.Find(Id);
            db.Countries.Remove(objCountry);
            db.SaveChanges();
            return "Deleted successfully";
        }
    }
}
