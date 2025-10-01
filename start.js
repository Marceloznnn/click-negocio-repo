import { spawn } from "child_process";

// Função para iniciar processos
function startProcess(command, args, cwd, name) {
  const proc = spawn(command, args, { cwd, stdio: "inherit", shell: true });

  proc.on("close", (code) => {
    console.log(`[${name}] finalizou com código: ${code}`);
  });

  proc.on("error", (err) => {
    console.error(`[${name}] erro:`, err);
  });

  return proc;
}

// Inicia backend (nodemon server.js)
startProcess("npm", ["run", "dev"], "./backend", "Backend");

// Inicia frontend (vite)
startProcess("npm", ["run", "dev"], "./frontend", "Frontend");
