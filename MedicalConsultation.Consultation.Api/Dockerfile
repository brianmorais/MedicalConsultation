FROM mcr.microsoft.com/dotnet/sdk:8.0 as build
WORKDIR /app
COPY . .
RUN dotnet restore
RUN dotnet publish -o /app/published-app

FROM mcr.microsoft.com/dotnet/aspnet:8.0 as runtime
WORKDIR /app
COPY --from=build /app/published-app .
ENTRYPOINT ["dotnet", "Api.dll"]
ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80