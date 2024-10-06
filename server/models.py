
class Overlay:
    def __init__(self, x, y, width, height, type, content):
        self.x = x
        self.y = y
        self.width = width
        self.height = height
        self.type = type
        self.content = content

    def to_dict(self):
        return {
            "x": self.x,
            "y": self.y,
            "width": self.width,
            "height": self.height,
            "type": self.type,
            "content": self.content
        }
