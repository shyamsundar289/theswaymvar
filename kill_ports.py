import psutil

for proc in psutil.process_iter(['pid', 'name']):
    try:
        conns = proc.connections()
        for conn in conns:
            if conn.laddr.port in (8080, 8081):
                print(f'Killing {proc.info["name"]} (PID {proc.info["pid"]}) on port {conn.laddr.port}')
                proc.kill()
    except Exception:
        pass
