import * as dotenv from "dotenv";

type NodeEnvironment = "dev" | "qa" | "production" | "stage" | "uat";
const NODE_ENV: NodeEnvironment = <NodeEnvironment>(
  (process.env.NODE_ENV || "dev")
);
dotenv.config({ path: `.env.${NODE_ENV}` });

interface IConfig {
  NODE_ENV: NodeEnvironment;
  port: string | number;
  database: {
    MONGODB_URI: string;
    MONGODB_DB_MAIN: string;
  };
  secret: string;
  project: {
    name: string;
    logLevel: string;
  };
  grpc: {
    port: number;
    host: string;
  };
  origin: string;
  tokenExpire: string;
  rateLimit: {
    maxRequest: number;
    maxTime: number; // TIME IN MILISECONDS
  };
  emailGRPC: {
    port: number;
    host: string;
  };
  fireblockGRPC: {
    port: number;
    host: string;
  };
  Networks: [
    {
      chainType: string;
      currency: string;
      rpc: string;
      icon: string;
      masterAddress: string;
      masterBlock: string;
      master2Address: string;
      master2Block: string;
      explorer: string;
      usdc: string
    }
  ];
  EVENTBATCHSIZE: number;
  socketPort: string | number;
  socketHost: string;
  S3: {
    AWS_S3_BUCKET_NAME: string;
    AWS_S3_BUCKET_ACCESS_KEY_ID: string;
    AWS_S3_BUCKET_SECRET_ACCESS_KEY: string;
    AWS_S3_KEY: string;
    AWS_S3_FOLDER: string;
    AWS_REGION: string;
  };
}

const dev: IConfig = {
  NODE_ENV,
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://production_uri/",
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || "users_db",
  },
  secret: process.env.SECRET || "@QEGTUI",
  project: {
    name: process.env.PROJECT_NAME,
    logLevel: process.env.LOG_LEVEL,
  },
  grpc: {
    port: Number(process.env.GRPC_CONTAINER_PORT),
    host: process.env.GRPC_CONTAINER_NAME,
  },
  origin: process.env.ALLOWED_ORIGIN,
  tokenExpire: process.env.TOKEN_EXPIRE || "60m",
  rateLimit: {
    maxRequest: Number(process.env.MAX_REQUEST) || 10,
    maxTime: Number(process.env.MAX_TIME) || 600000,
  },
  emailGRPC: {
    host: process.env.EMAIL_GRPC_HOST,
    port: Number(process.env.EMAIL_GRPC_PORT),
  },
  fireblockGRPC: {
    host: process.env.FIREBLOCK_GRPC_HOST,
    port: Number(process.env.FIREBLOCK_GRPC_PORT),
  },
  Networks: [
    {
      chainType: process.env.CHAIN_TYPE,
      currency: process.env.CURRENCY,
      rpc: process.env.RPC_URL,
      icon: process.env.ICON,
      masterAddress: process.env.MASTER_ADDRESS,
      masterBlock: process.env.MASTER_BLOCKNUMBER,
      master2Address: process.env.MASTER2_ADDRESS,
      master2Block: process.env.MASTER2_BLOCKNUMBER,
      explorer: process.env.EXPLORER,
      usdc: process.env.USDC
    },
  ],
  EVENTBATCHSIZE: Number(process.env.EVENTBATCHSIZE),
  socketPort: process.env.SOCKET_PORT,
  socketHost: process.env.SOCKET_HOST,
  S3: {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_ACCESS_KEY_ID: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    AWS_S3_BUCKET_SECRET_ACCESS_KEY:
      process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
    AWS_S3_KEY: process.env.AWS_S3_KEY,
    AWS_S3_FOLDER: process.env.AWS_S3_FOLDER,
    AWS_REGION: process.env.AWS_REGION,
  },
};

const production: IConfig = {
  NODE_ENV,
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://production_uri/",
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || "users_db",
  },
  secret: process.env.SECRET || "@QEGTUI",
  project: {
    name: process.env.PROJECT_NAME,
    logLevel: process.env.LOG_LEVEL,
  },
  grpc: {
    port: Number(process.env.GRPC_CONTAINER_PORT),
    host: process.env.GRPC_CONTAINER_NAME,
  },
  origin: process.env.ALLOWED_ORIGIN,
  tokenExpire: process.env.TOKEN_EXPIRE || "60m",
  rateLimit: {
    maxRequest: Number(process.env.MAX_REQUEST) || 10,
    maxTime: Number(process.env.MAX_TIME) || 600000,
  },
  emailGRPC: {
    host: process.env.EMAIL_GRPC_HOST,
    port: Number(process.env.EMAIL_GRPC_PORT),
  },
  fireblockGRPC: {
    host: process.env.FIREBLOCK_GRPC_HOST,
    port: Number(process.env.FIREBLOCK_GRPC_PORT),
  },
  Networks: [
    {
      chainType: process.env.CHAIN_TYPE,
      currency: process.env.CURRENCY,
      rpc: process.env.RPC_URL,
      icon: process.env.ICON,
      masterAddress: process.env.MASTER_ADDRESS,
      masterBlock: process.env.MASTER_BLOCKNUMBER,
      master2Address: process.env.MASTER2_ADDRESS,
      master2Block: process.env.MASTER2_BLOCKNUMBER,
      explorer: process.env.EXPLORER,
      usdc: process.env.USDC
    },
  ],
  EVENTBATCHSIZE: Number(process.env.EVENTBATCHSIZE),
  socketPort: process.env.SOCKET_PORT,
  socketHost: process.env.SOCKET_HOST,
  S3: {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_ACCESS_KEY_ID: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    AWS_S3_BUCKET_SECRET_ACCESS_KEY:
      process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
    AWS_S3_KEY: process.env.AWS_S3_KEY,
    AWS_S3_FOLDER: process.env.AWS_S3_FOLDER,
    AWS_REGION: process.env.AWS_REGION,
  },
};

const qa: IConfig = {
  NODE_ENV,
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    MONGODB_DB_MAIN: "test_users_db",
  },
  secret: process.env.SECRET || "@QEGTUI",
  project: {
    name: process.env.PROJECT_NAME,
    logLevel: process.env.LOG_LEVEL,
  },
  grpc: {
    port: Number(process.env.GRPC_CONTAINER_PORT),
    host: process.env.GRPC_CONTAINER_NAME,
  },
  origin: process.env.ALLOWED_ORIGIN,
  tokenExpire: process.env.TOKEN_EXPIRE || "60m",
  rateLimit: {
    maxRequest: Number(process.env.MAX_REQUEST) || 10,
    maxTime: Number(process.env.MAX_TIME) || 600000,
  },
  emailGRPC: {
    host: process.env.EMAIL_GRPC_HOST,
    port: Number(process.env.EMAIL_GRPC_PORT),
  },
  fireblockGRPC: {
    host: process.env.FIREBLOCK_GRPC_HOST,
    port: Number(process.env.FIREBLOCK_GRPC_PORT),
  },
  Networks: [
    {
      chainType: "BSC",
      currency: "BNB",
      rpc: process.env.BSC_RPC_URL,
      icon: process.env.BSC_ICON,
      masterAddress: process.env.BSC_MASTER_ADDRESS,
      masterBlock: process.env.BSC_MASTER_BLOCKNUMBER,
      master2Address: process.env.BSC_MASTER2_ADDRESS,
      master2Block: process.env.BSC_MASTER2_BLOCKNUMBER,
      explorer: process.env.BSC_EXPLORER,
      usdc: process.env.BSC_USDC
    },
  ],
  EVENTBATCHSIZE: Number(process.env.EVENTBATCHSIZE),
  socketPort: process.env.SOCKET_PORT,
  socketHost: process.env.SOCKET_HOST,
  S3: {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_ACCESS_KEY_ID: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    AWS_S3_BUCKET_SECRET_ACCESS_KEY:
      process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
    AWS_S3_KEY: process.env.AWS_S3_KEY,
    AWS_S3_FOLDER: process.env.AWS_S3_FOLDER,
    AWS_REGION: process.env.AWS_REGION,
  },
};

const stage: IConfig = {
  NODE_ENV,
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    MONGODB_DB_MAIN: "test_users_db",
  },
  secret: process.env.SECRET || "@QEGTUI",
  project: {
    name: process.env.PROJECT_NAME,
    logLevel: process.env.LOG_LEVEL,
  },
  grpc: {
    port: Number(process.env.GRPC_CONTAINER_PORT),
    host: process.env.GRPC_CONTAINER_NAME,
  },
  origin: process.env.ALLOWED_ORIGIN,
  tokenExpire: process.env.TOKEN_EXPIRE || "60m",
  rateLimit: {
    maxRequest: Number(process.env.MAX_REQUEST) || 10,
    maxTime: Number(process.env.MAX_TIME) || 600000,
  },
  emailGRPC: {
    host: process.env.EMAIL_GRPC_HOST,
    port: Number(process.env.EMAIL_GRPC_PORT),
  },
  fireblockGRPC: {
    host: process.env.FIREBLOCK_GRPC_HOST,
    port: Number(process.env.FIREBLOCK_GRPC_PORT),
  },
  Networks: [
    {
      chainType: process.env.CHAIN_TYPE,
      currency: process.env.CURRENCY,
      rpc: process.env.BSC_RPC_URL,
      icon: process.env.BSC_ICON,
      masterAddress: process.env.BSC_MASTER_ADDRESS,
      masterBlock: process.env.BSC_MASTER_BLOCKNUMBER,
      master2Address: process.env.BSC_MASTER2_ADDRESS,
      master2Block: process.env.BSC_MASTER2_BLOCKNUMBER,
      explorer: process.env.BSC_EXPLORER,
      usdc: process.env.BSC_USDC
    },
  ],
  EVENTBATCHSIZE: Number(process.env.EVENTBATCHSIZE),
  socketPort: process.env.SOCKET_PORT,
  socketHost: process.env.SOCKET_HOST,
  S3: {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_ACCESS_KEY_ID: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    AWS_S3_BUCKET_SECRET_ACCESS_KEY:
      process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
    AWS_S3_KEY: process.env.AWS_S3_KEY,
    AWS_S3_FOLDER: process.env.AWS_S3_FOLDER,
    AWS_REGION: process.env.AWS_REGION,
  },
};

const uat: IConfig = {
  NODE_ENV,
  port: process.env.PORT || 3000,
  database: {
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://production_uri/",
    MONGODB_DB_MAIN: process.env.MONGODB_DB_MAIN || "users_db",
  },
  secret: process.env.SECRET || "@QEGTUI",
  project: {
    name: process.env.PROJECT_NAME,
    logLevel: process.env.LOG_LEVEL,
  },
  grpc: {
    port: Number(process.env.GRPC_CONTAINER_PORT),
    host: process.env.GRPC_CONTAINER_NAME,
  },
  origin: process.env.ALLOWED_ORIGIN,
  tokenExpire: process.env.TOKEN_EXPIRE || "60m",
  rateLimit: {
    maxRequest: Number(process.env.MAX_REQUEST) || 10,
    maxTime: Number(process.env.MAX_TIME) || 600000,
  },
  emailGRPC: {
    host: process.env.EMAIL_GRPC_HOST,
    port: Number(process.env.EMAIL_GRPC_PORT),
  },
  fireblockGRPC: {
    host: process.env.FIREBLOCK_GRPC_HOST,
    port: Number(process.env.FIREBLOCK_GRPC_PORT),
  },
  Networks: [
    {
      chainType: "BSC",
      currency: "BNB",
      rpc: process.env.BSC_RPC_URL,
      icon: process.env.BSC_ICON,
      masterAddress: process.env.BSC_MASTER_ADDRESS,
      masterBlock: process.env.BSC_MASTER_BLOCKNUMBER,
      master2Address: process.env.BSC_MASTER2_ADDRESS,
      master2Block: process.env.BSC_MASTER2_BLOCKNUMBER,
      explorer: process.env.BSC_EXPLORER,
      usdc: process.env.BSC_USDC
    },
  ],
  EVENTBATCHSIZE: Number(process.env.EVENTBATCHSIZE),
  socketPort: process.env.SOCKET_PORT,
  socketHost: process.env.SOCKET_HOST,
  S3: {
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME,
    AWS_S3_BUCKET_ACCESS_KEY_ID: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
    AWS_S3_BUCKET_SECRET_ACCESS_KEY:
      process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
    AWS_S3_KEY: process.env.AWS_S3_KEY,
    AWS_S3_FOLDER: process.env.AWS_S3_FOLDER,
    AWS_REGION: process.env.AWS_REGION,
  },
};

const config: {
  [name: string]: IConfig;
} = {
  qa,
  dev,
  production,
  stage,
  uat,
};

export default config[NODE_ENV];
