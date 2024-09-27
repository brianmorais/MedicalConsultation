namespace Application.Interfaces
{
    public interface IRedisCache
    {
        Task SetValueAsync<T>(string key, T value, int timeout = 60);
        Task<T?> GetValueAsync<T>(string key);
    }
}
