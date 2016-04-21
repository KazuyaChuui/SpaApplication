using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SpaApplication.Models
{
    public class SpaContext: DbContext
    {
        public DbSet<Employee> Employee { get; set; }

        public DbSet<Department> Department { get; set; }
    }
}