/** node-server-eject redis */
import redis from "redis"
import promisifyAll from "util-promisifyall"
import { error } from "./logger"

promisifyAll(redis.RedisClient.prototype)

interface REDIS {
  init: () => void
  client: redis.RedisClient
}

interface REDIS_CONFIG {
  [key: string]: string
}

declare module "redis" {
  export interface RedisClient extends NodeJS.EventEmitter {
    getAsync(key: string): Promise<string>
    setAsync(key: string, value: string): Promise<void>
  }
}

const cache = {} as REDIS

const init = () => {
  const { REDIS_CONFIG } = process.env
  if (!REDIS_CONFIG) {
    return Promise.reject("REDIS_CONFIG环境变量不存在")
  }
  const cfg = JSON.parse(REDIS_CONFIG)

  const redisOption = ["host", "port", "prefix", "db", "password"].reduce(
    (acc: REDIS_CONFIG, key: string) => {
      if (cfg[key]) {
        acc[key] = cfg[key]
      }
      return acc
    },
    {}
  )
  const client = redis.createClient(redisOption)
  client.on("error", err => {
    error("redis.ts:", err)
  })
  cache.client = client
}

cache.init = init

export default cache
