//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace TodoListApplication.Entity
{
    using System;
    using System.Collections.Generic;
    
    public partial class TodoList
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public System.DateTime TargetDate { get; set; }
        public string Severity { get; set; }
        public string TaskStatus { get; set; }
    }
}
