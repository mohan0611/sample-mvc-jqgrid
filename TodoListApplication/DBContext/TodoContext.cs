using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using TodoListApplication.Models;

namespace TodoListApplication.DBContext
{
    public class TodoContext:DbContext
    {
        public DbSet<TodoList> TodoLists { get; set; }
    }
}