using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoListApplication.Models
{
    public class TodoList
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TargetDate { get; set; }
        public string Severity { get; set; }
        public string TaskStatus { get; set; }
    }
}