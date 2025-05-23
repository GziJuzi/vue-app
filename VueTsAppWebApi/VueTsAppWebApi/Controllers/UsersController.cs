using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VueTsAppWebApi.DTO.Users.UsersDTO;
using VueTsAppWebApi.Models.Users.UsersRequest;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VueTsAppWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        // In-memory user storage for demo purposes
        private static readonly Dictionary<string, User> Users = new Dictionary<string, User>
        {
            { "admin", new User { Id = "admin", Name = "Admin", Phone = "432-456-4533", Email = "admin@example.com", Address = "123 North Dist" } },
            { "alice", new User { Id = "alice", Name = "Alice", Phone = "123-456-7890", Email = "alice@example.com", Address = "123 Main St" } },
            { "bob", new User { Id = "bob", Name = "Bob", Phone = "987-654-3210", Email = "bob@example.com", Address = "456 Oak Ave" } }

        };

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(string id)
        {
            if (!Users.TryGetValue(id, out var user))
                return NotFound();

            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public ActionResult UpdateUser(string id, [FromBody] UpdateUserDto update)
        {
            if (!Users.TryGetValue(id, out var user))
                return NotFound();

            // Update user properties
            user.Phone = update.Phone ?? user.Phone;
            user.Email = update.Email ?? user.Email;
            user.Address = update.Address ?? user.Address;

            return NoContent(); // 204 No Content for successful update without return body
        }
    }

}
