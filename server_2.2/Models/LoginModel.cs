using System;
using System.ComponentModel.DataAnnotations;

namespace server_2._2.Models
{
    public class LoginModel
    {
        [Required]
        public string Mail { get; set; }
     
        [Required]
        public string Password { get; set; }
    }
}
