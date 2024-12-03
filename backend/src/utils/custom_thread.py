from threading import Thread

class ThreadWrapper(Thread):
    def __init__(self, group = None, target = None, name = None, args = ..., kwargs = {}, *, daemon = None):
        super().__init__(group, target, name, args, kwargs, daemon=daemon)
    def run(self):
        try:
            if self._target is not None:
                self._result = self._target(*self._args, **self._kwargs)
        finally:
            # del self._target, self._args, self._kwargs
            pass
    def join(self,*args):
        super().join(*args)
        return self._result