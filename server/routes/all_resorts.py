from flask_restful import Resource
from models.resorts import Resort

class Resorts(Resource):
    def get(self):
        try:
            resorts = Resort.query.all()
            return [resort.to_dict() for resort in resorts], 200
        except Exception as e:
            return {"error": str(e)}, 404