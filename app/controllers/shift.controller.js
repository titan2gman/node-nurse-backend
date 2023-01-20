const db = require("../models");
const Shift = db.shifts;
const Facility = db.facilities;

exports.findAll = async (req, res) => {
  try {
    const shifts = await Shift.findAll({
      include: [
        { model: Facility }
      ]
    });
    res.send({
      data: shifts,
      message: "Success"
    });
  } catch(err) {
    res.status(500).send({
      message: err.message || "Error"
    });
  }
};

exports.checkOverlap = async (req, res) => {
  const id1 = req.params.id1;
  const id2 = req.params.id2;

  try {
    const shift1 = await Shift.findByPk(id1);
    const shift2 = await Shift.findByPk(id2);
  
    const shift1StartTime = Date.parse(`${shift1.shiftDate} ${shift1.startTime}`) / 1000 / 60;
    const shift2StartTime = Date.parse(`${shift2.shiftDate} ${shift2.startTime}`) / 1000 / 60;
    let shift1EndTime = Date.parse(`${shift1.shiftDate} ${shift1.endTime}`) / 1000 / 60;
    let shift2EndTime = Date.parse(`${shift2.shiftDate} ${shift2.endTime}`) / 1000 / 60;
    shift1EndTime = shift1StartTime < shift1EndTime ? shift1EndTime : shift1EndTime + 24 * 60;
    shift2EndTime = shift2StartTime < shift2EndTime ? shift2EndTime : shift2EndTime + 24 * 60; 
  
    const overlap = Math.max(0, Math.min(shift1EndTime, shift2EndTime) - Math.max(shift1StartTime, shift2StartTime));
    const maxOverlap = shift1.facilityId == shift2.facilityId ? 30 : 0;
    const exceed = overlap <= maxOverlap;
    
    if (shift1 != null && shift2 != null) {
      res.send({
        overlap,
        maxOverlap,
        exceed
      });
    } else {
      res.status(500).send({
        message: "Invalid shift ids"
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error"
    });
  }
};