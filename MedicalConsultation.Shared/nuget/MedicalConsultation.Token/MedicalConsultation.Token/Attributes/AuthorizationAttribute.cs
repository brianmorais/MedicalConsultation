using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace MedicalConsultation.Token.Attributes
{
    public class AuthorizationAttribute : ActionFilterAttribute
    {
        private readonly string[] _roles;

        public AuthorizationAttribute(params string[] roles)
        {
            _roles = roles;
        }

        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var token = context.HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(token))
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var authService = context.HttpContext.RequestServices.GetService<Services.IAuthenticationService>();
            var userClaims = await authService.ValidateToken(token);

            if (userClaims == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var userRole = userClaims.Role;
            if (!_roles.Contains(userRole))
            {
                context.Result = new ForbidResult();
                return;
            }

            await next();
        }
    }
}
