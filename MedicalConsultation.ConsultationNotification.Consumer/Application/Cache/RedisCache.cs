using Application.Interfaces;
using StackExchange.Redis;
using System.Text.Json;

namespace Application.Cache
{
    public class RedisCache : IRedisCache
    {
        private readonly IConnectionMultiplexer _redis;

        public RedisCache(IConnectionMultiplexer redis)
        {
            _redis = redis;
        }

        public async Task<T?> GetValueAsync<T>(string key)
        {
            var db = _redis.GetDatabase();
            var content = await db.StringGetAsync(key);

            if (content.IsNullOrEmpty)
            {
                return default;
            }

            return JsonSerializer.Deserialize<T>(content!);
        }

        public async Task SetValueAsync<T>(string key, T value, int timeout = 60)
        {
            var db = _redis.GetDatabase();
            var content = JsonSerializer.Serialize(value);
            await db.StringSetAsync(key, content, TimeSpan.FromMinutes(timeout));
        }
    }
}
