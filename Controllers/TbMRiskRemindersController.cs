using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using tam_risk_project.Models;

namespace tam_risk_project.Controllers
{
    [Produces("application/json")]
    [Route("api/TbMRiskReminders")]
    public class TbMRiskRemindersController : Controller
    {
        private readonly TAM_PROJECTContext _context;

        public TbMRiskRemindersController(TAM_PROJECTContext context)
        {
            _context = context;
        }

        // GET: api/TbMRiskReminders
        [HttpGet]
        public IEnumerable<TbMRiskReminder> GetTbMRiskReminder()
        {
            return _context.TbMRiskReminder;
        }

        // GET: api/TbMRiskReminders/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTbMRiskReminder([FromRoute] short id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMRiskReminder = await _context.TbMRiskReminder.SingleOrDefaultAsync(m => m.YearActive == id);

            if (tbMRiskReminder == null)
            {
                return NotFound();
            }

            return Ok(tbMRiskReminder);
        }

        // PUT: api/TbMRiskReminders/5
        [HttpPut]
        public async Task<IActionResult> PutTbMRiskReminder([FromRoute] short id, [FromBody] TbMRiskReminder tbMRiskReminder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            _context.Entry(tbMRiskReminder).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TbMRiskReminderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/TbMRiskReminders
        [HttpPost]
        public async Task<IActionResult> PostTbMRiskReminder([FromBody] TbMRiskReminder tbMRiskReminder)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.TbMRiskReminder.Add(tbMRiskReminder);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TbMRiskReminderExists(tbMRiskReminder.YearActive))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTbMRiskReminder", new { id = tbMRiskReminder.YearActive }, tbMRiskReminder);
        }

        // DELETE: api/TbMRiskReminders/5
        [HttpPost("deletecontrol")]
        public async Task<IActionResult> DeleteTbMRiskReminder([FromBody] TbMRiskReminder controlDelete)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var tbMRiskReminder = await _context.TbMRiskReminder.SingleOrDefaultAsync(e => e.YearActive == controlDelete.YearActive && e.TypeReminder == controlDelete.TypeReminder && e.CounterNo == controlDelete.CounterNo);
            if (tbMRiskReminder == null)
            {
                return NotFound();
            }

            _context.TbMRiskReminder.Remove(tbMRiskReminder);
            await _context.SaveChangesAsync();

            return Ok(tbMRiskReminder);
        }

        private bool TbMRiskReminderExists(short id)
        {
            return _context.TbMRiskReminder.Any(e => e.YearActive == id);
        }
    }
}