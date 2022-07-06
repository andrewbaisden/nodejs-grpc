const PROTO_PATH = __dirname + '/welcome.proto';

const grpc = require('@grpc/grpc-js');

const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,

  longs: String,

  enums: String,

  defaults: true,

  oneofs: true,
});

const welcome_proto = grpc.loadPackageDefinition(packageDefinition).welcome;

/**

* Implements the SayWelcome RPC method.

*/

function SayWelcome(call, callback) {
  callback(null, { message: 'Welcome ' + call.request.name });
}

/**

* Starts an RPC server that receives requests for the Welcome service at the

* sample server port

*/

function main() {
  const server = new grpc.Server();

  server.addService(welcome_proto.Welcome.service, { SayWelcome: SayWelcome });

  server.bindAsync(
    '0.0.0.0:50051',

    grpc.ServerCredentials.createInsecure(),

    () => {
      server.start();
    }
  );
}

main();
