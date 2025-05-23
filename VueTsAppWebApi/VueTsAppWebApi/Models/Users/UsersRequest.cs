namespace VueTsAppWebApi.Models.Users.UsersRequest
{
    public class User
    {
        public string Id { get; set; } = default!;
        public string Name { get; set; } = default!;
        public string? Phone { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
    }
}
