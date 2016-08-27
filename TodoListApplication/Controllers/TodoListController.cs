using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using TodoListApplication.DBContext;
using TodoListApplication.Models;


namespace TodoListApplication.Controllers
{
    public class TodoListController : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }

        TodoContext db = new TodoContext();
        public JsonResult GetTodoLists(string sidx, string sord, int page, int rows)  //Gets the todo Lists.
        {
            int pageIndex = Convert.ToInt32(page) - 1;
            int pageSize = rows;
            var todoListsResults = db.TodoLists.Select(
                    a => new
                        {   a.Id, a.Severity, 
                            a.TargetDate, 
                            a.TaskDescription, 
                            a.TaskName, 
                            a.TaskStatus
                        });
            int totalRecords = todoListsResults.Count();
            var totalPages = (int)Math.Ceiling((float)totalRecords / (float)rows);
            if (sord.ToUpper() == "DESC")
            {
                todoListsResults = todoListsResults.OrderByDescending(s => s.TaskName);
                todoListsResults = todoListsResults.Skip(pageIndex * pageSize).Take(pageSize);
            }
            else
            {
                todoListsResults = todoListsResults.OrderBy(s => s.TaskName);
                todoListsResults = todoListsResults.Skip(pageIndex * pageSize).Take(pageSize);
            }
            var jsonData = new{
                 total = totalPages,
                 page,
                 records = totalRecords,
                 rows = todoListsResults
            };
            return Json(jsonData, JsonRequestBehavior.AllowGet);
        }

        // TODO:insert a new row to the grid logic here
        [HttpPost]
        public string Create([Bind(Exclude = "Id")] TodoList objTodo)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.TodoLists.Add(objTodo);
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
        public string Edit(TodoList objTodo)
        {
            string msg;
            try
            {
                if (ModelState.IsValid)
                {
                    db.Entry(objTodo).State = EntityState.Modified;
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
            TodoList todolist = db.TodoLists.Find(Id);
            db.TodoLists.Remove(todolist);
            db.SaveChanges();
            return "Deleted successfully";
        }
    }
}
