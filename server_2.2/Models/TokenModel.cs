using System;

namespace server_2._2.Models
{
    public class TokenModel
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public string Mail { get; set; }
        public DateTime? Expris { get; set; }


    }
}
