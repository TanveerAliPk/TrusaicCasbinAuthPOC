using Microsoft.EntityFrameworkCore;
using server.Models;
using Casbin.Persist.Adapter.EFCore;
using Casbin.Persist.Adapter.EFCore.Entities;

namespace server.Data
{
    public class ApplicationDbContext : CasbinDbContext<int>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserAttribute> UserAttributes { get; set; }
        public DbSet<CasbinPolicy> CasbinPolicies { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Product> Products { get; set; }
    }
}
